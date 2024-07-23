const { User, SavedPassword, Order } = require('../models')
const { comparePassword, hashPassword } = require('../bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const { signToken } = require('../jwt')
const nodemailer = require("nodemailer");

const authentication = require('../middlewares/authentication');

const userRouter = require('express').Router()

userRouter.post('/register', async (req, res) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const result = await User.create(req.body)

    res
      .status(200)
      .json({
        email: result.email
      });
  } catch (error) {
    console.log(error);
  }
})

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw {
        name: 'BadRequest',
        message: 'email and password is required',
        status: 400
      }
    }
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw {
        name: 'Unauthorized',
        message: 'Email wrong',
        status: 401
      }
    }
    const isValidPassword = comparePassword(password, user.password)
    if (!isValidPassword) {
      throw {
        name: 'Unauthorized',
        message: 'Password wrong',
        status: 401
      }
    }
    const access_token = signToken({ id: user.id })

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dzakii8@gmail.com",
        pass: "rytn fylw mddm auhb",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'Password Manager', // sender address
        to: req.body.email, // list of receivers
        subject: "Login Verification Link", // Subject line
        text: "", // plain text body
        html: `<a href="${req.headers.origin}/verify?t=${access_token}">Login Verification</a>`
      });

    }
    main().catch(console.error);
    res
      .status(200)
      .json({ message: `Email sent to user : "${req.headers.origin}/verify"` })
  } catch (error) {
    console.log(error);
  }
})

userRouter.get('/verify', async (req, res) => {
  const { t } = req.query
  try {
    const access_token = t
    res
      .status(200)
      .json({ access_token })
  } catch (error) {
    console.log(error);
  }
})

userRouter.post('/google-login', async (req, res) => {
  try {
    const { google_token } = req.body

    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const [user, created] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        email: payload.email,
        password: hashPassword('admin'),
      }
    })
    const access_token = signToken({ id: user.id })

    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    res
      .status(created ? 201 : 200)
      .json({
        "message": `User ${user.email} found`,
        "access_token": access_token,
      })
  } catch (error) {
    console.log(error);
  }
})

userRouter.use(authentication)

userRouter.get('/users/me', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'status', 'role']
    })
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

userRouter.patch('/users/me/upgrade', async (req, res) => {
  const userId = req.user.id
  const orderId = req.body.orderId
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      throw { name: "Unauthorized", message: "You are not authorized to upgrade" }
    }
    if (user.status == 'premium') {
      return res.json({ success: false, message: "Already premium" })
    }
    const order = await Order.findOne({
      where: {
        orderId
      }
    })

    if (!order) {
      throw { name: 'Not Found', message: "No Transaction Found" }
    }

    const url = `https://api.sandbox.midtrans.com/v2/${orderId}/status`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: "Basic " + "U0ItTWlkLXNlcnZlci13UEF5ZjJmUmcwZk4xUnNyYkd0V1dERDI6"
      }
    }

    const { data } = await axios.get(url, options)

    if (data.transaction_status === 'capture' && +data.status_code === 200) {
      await order.update({
        status: 'paid',
        paidDate: new Date()
      })

      await user.update({
        status: 'premium'
      })

      res.json({ message: 'Upgrade account success' })
    } else {
      res.status(400).json({ message: 'Transaction is not success' })
    }
  } catch (error) {
    if (error.name === 'Unauthorized') {
      res.status(401).json({ message: error.message })
    } else if (error.name === 'NotFound') {
      res.status(404).json({ message: error.message })
    } else {
      res.status(500).json({ message: `Internal server error` })
    }
  }
})

module.exports = userRouter