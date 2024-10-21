const express = require('express');
const { createOrder } = require('../controllers/cnController');

const router = express.Router();

router.post('/createCnOrder', createOrder)

module.exports = router;