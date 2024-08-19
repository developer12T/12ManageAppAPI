const express = require('express')
const orderRoutes = require('./routes/orderRoutes')
const cnRoutes = require('./routes/cnRoutes')
const customerRoutes = require('./routes/customerRoutes')

const router = express.Router()

router.use('/erp/sale', orderRoutes)
router.use('/erp/cn', cnRoutes)
router.use('/erp', customerRoutes)

module.exports = router