const midtransRouter = require('express').Router()
const midtransClient = require('midtrans-client')
const { Order } = require('../models')

midtransRouter.get('/payment/midtrans/initiate', async (req, res, next) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: `SB-Mid-server-wPAyf2fRg0fN1RsrbGtWWDD2`
    })

    const orderId = `TRX-au-${Math.random().toString()}`
    const trxAmount = 5000
    const transaction = await snap.createTransaction({
      "transaction_details": {
        "order_id": orderId,
        "gross_amount": trxAmount
      },
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "email": req.user.email
      }
    })

    await Order.create({
      orderId,
      userId: req.user.id,
      amount: trxAmount
    })
    res.json({ token: transaction.token, orderId })
  } catch (error) {
    console.log(error)
  }

})

module.exports = midtransRouter
