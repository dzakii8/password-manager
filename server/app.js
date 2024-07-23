if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express')
const app = express()
const authentication = require('./middlewares/authentication')

const userRouter = require("./routes/users");
const passwordRouter = require("./routes/passwords");
const thirdRouter = require("./routes/thirdparties");
const midtransRouter = require("./routes/midtrans");

const cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(userRouter)

app.use(authentication)

app.use(passwordRouter)
app.use(thirdRouter)
app.use(midtransRouter)

module.exports = app
