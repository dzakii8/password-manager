const { SavedPassword } = require('../models')


const passwordRouter = require('express').Router()

passwordRouter.post('/savePassword', async (req, res) => {
  try {
    //rqr name, password, user id, req,body
    req.body.userId = req.user.id

    const result = await SavedPassword.create(req.body)

    res
      .status(200)
      .json(result);
  } catch (error) {
    console.log(error);
  }
})

passwordRouter.get('/savePassword', async (req, res) => {
  try {
    //rqr name, password, user id, req,body
    const userId = req.user.id

    const result = await SavedPassword.findAll({
      where: {
        userId: userId
      }
    })
    // console.log(result);

    res
      .status(200)
      .json(result);
  } catch (error) {
    console.log(error);
  }
})

passwordRouter.get('/savePassword/:id', async (req, res) => {
  try {
    //rqr name, password, user id, req,body
    const userId = req.user.id

    const result = await SavedPassword.findByPk(req.params.id)
    // console.log(result);

    res
      .status(200)
      .json(result);
  } catch (error) {
    console.log(error);
  }
})

passwordRouter.delete('/savePassword/:id', async (req, res) => {
  try {
    //rqr name, password, user id, req,body
    const result = await SavedPassword.destroy({
      where: {
        id: req.params.id
      }
    })

    res
      .status(200)
      .json(result);
  } catch (error) {
    console.log(error);
  }
})

passwordRouter.patch('/savePassword', async (req, res) => {
  try {
    const { id } = req.params
    const data = SavedPassword.findByPk(id)
    //rqr name, password, user id, req,body
    let { password } = req.body

    if (password) {
      const result = await data.update({
        password
      }, {
        where: id
      })
    } else {
      throw { message: "cant update" }
    }

    res
      .status(200)
      .json({
        message: "Success update"
      });
  } catch (error) {
    console.log(error);
  }
})

module.exports = passwordRouter
