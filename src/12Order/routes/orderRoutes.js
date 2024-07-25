const express = require('express');
const { getOrderCms } = require('../controllers/orderController');

const router = express.Router();

router.get('/getOrderCms', getOrderCms);

module.exports = router;
