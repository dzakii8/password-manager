const thirdRouter = require('express').Router()
const { default: axios } = require('axios')
const limiter = require('../middlewares/limit-api')


// Apply the rate limiting middleware to all requests.

thirdRouter.get('/generatePassword/:length', limiter, async (req, res) => {
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