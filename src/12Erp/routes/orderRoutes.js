const express = require('express');
const { syncOrders, createOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/syncOrders', syncOrders);
router.post('/createOrder', createOrder);

module.exports = router;
