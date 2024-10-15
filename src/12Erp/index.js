const express = require('express')
const orderRoutes = require('./routes/orderRoutes')
const cnRoutes = require('./routes/cnRoutes')
const customerRoutes = require('./routes/customerRoutes')
const productRoutes = require('./routes/productRoutes')

const router = express.Router()

router.use('/erp/sale', orderRoutes)
router.use('/erp/cn', cnRoutes)
router.use('/erp/product', productRoutes)
router.use('/erp', customerRoutes)

module.exports = router