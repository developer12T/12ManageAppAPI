const express = require('express');
const orderRoutes = require('./orderRoutes');
const customerRoutes = require('./customerRoutes');

const router = express.Router();

router.use('/erp', orderRoutes);
router.use('/erp', customerRoutes);

module.exports = router;
