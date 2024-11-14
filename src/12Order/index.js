const express = require('express')
const logRoutes = require('./routes/logRoute')
const orderRoutes = require('./routes/orderRoutes')
const cnRoutes = require('./routes/cnRoutes')

const router = express.Router()

router.use('/order', logRoutes)
router.use('/order/sale', orderRoutes)
router.use('/order/cn', cnRoutes)

module.exports = router