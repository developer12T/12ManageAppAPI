const express = require('express')
const { syncOrders, addOrder, addOrderErp } = require('../controllers/orderController')

const router = express.Router()

router.get('/syncOrders', syncOrders)
router.post('/addOrder', addOrder)
router.post('/addOrderErp', addOrderErp)

module.exports = router
