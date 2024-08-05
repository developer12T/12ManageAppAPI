const express = require('express');
const { syncOrders } = require('../controllers/orderController');

const router = express.Router();

router.get('/syncOrders', syncOrders);

module.exports = router;
