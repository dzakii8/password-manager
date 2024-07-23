if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express')
const authentication = require('./middlewares/authentication')
const cors = require('cors');

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

const userRouter = require("./routes/users");
const passwordRouter = require("./routes/passwords");
const thirdRouter = require("./routes/thirdparties");
const midtransRouter = require("./routes/midtrans");

app.use(userRouter)

app.use(authentication)

app.use(passwordRouter)
app.use(thirdRouter)
app.use(midtransRouter)

module.exports = app
