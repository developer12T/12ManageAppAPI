const express = require('express');
const { getProductLot } = require('../controllers/productController');

const router = express.Router();

router.post('/getProductLot', getProductLot)

module.exports = router;