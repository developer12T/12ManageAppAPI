const express = require('express');
const orderRoutes = require('./routes/orderRoutes');

const router = express.Router();

router.use('/', orderRoutes);

module.exports = router;