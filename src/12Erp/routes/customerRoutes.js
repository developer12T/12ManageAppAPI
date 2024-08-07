const express = require('express');
const { syncCustomer } = require('../controllers/customerController');

const router = express.Router();

router.get('/syncCustomer', syncCustomer);

module.exports = router;
