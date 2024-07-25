const express = require('express');
const { getOrderCm, getOrderCmDetail } = require('../controllers/orderController');

const router = express.Router();

router.get('/getOrderCm', getOrderCm);
router.post('/getOrderCmDetail', getOrderCmDetail);

module.exports = router;
