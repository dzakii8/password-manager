const { rateLimit } = require('express-rate-limit')

const limitUser = rateLimit({
  windowMs: 10 * 60 * 100,
  limit: 2,
})

const limitPremium = rateLimit({
  windowMs: 10 * 60 * 100,
  limit: 2
})

const limiter = (req, res, next) => {
  if (1 !== 1) {
    return limitUser(req, res, next)
  } else {
    return limitPremium(req, res, next)
  }
}

module.exports = limiter
