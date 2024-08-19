const express = require('express')
const orderRoutes = require('./routes/orderRoutes')
const cnRoutes = require('./routes/cnRoutes')

const router = express.Router()

router.use('/order/sale', orderRoutes)
router.use('/order/cn', cnRoutes)

module.exports = router