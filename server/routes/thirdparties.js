const thirdRouter = require('express').Router()
const limit = require("express-limit").limit
const { default: axios } = require('axios')

const middlewaresLimit = limit({
  max: 2, // 5 requests
  period: 60 * 1000, // per minute (60 seconds)
})

const limitApi = function (req, res, next) {

  if (req.user.status == "premium") {
    return next()
  }
  middlewaresLimit(req, res, next)
}

thirdRouter.get('/generatePassword/:length', limitApi, async (req, res) => {
  try {
    //rqr length from params
    const { length } = req.params
    const result = await axios.get('https://api.api-ninjas.com/v1/passwordgenerator?length=' + length, {
      headers: {
        'X-Api-Key': "HYrG1yi3VRNawDJMapPiYw==Y83Ls0yTYG8ZGUYo",
        'Content-Type': 'application/json'
      }
    })
    res
      .status(200)
      .json({
        result: result.data.random_password
      });
  } catch (error) {
    console.log(error);
  }
})

module.exports = thirdRouter