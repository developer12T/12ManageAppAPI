const express = require('express');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

router.use('/erp', orderRoutes);

module.exports = router;
