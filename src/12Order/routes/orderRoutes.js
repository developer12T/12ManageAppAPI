const express = require('express');
const { getOrderCm, getOrderCmDetail, summaryOrder, summaryAll } = require('../controllers/orderController');

const router = express.Router();

router.get('/getOrderCm', getOrderCm);
router.post('/getOrderCmDetail', getOrderCmDetail);
router.post('/summaryOrder', summaryOrder);
router.post('/summaryAll', summaryAll);

module.exports = router;
