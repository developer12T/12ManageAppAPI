const express = require('express');
const { createOrder, addOrderErp } = require('../controllers/cnController');

const router = express.Router();

router.post('/createCnOrder', createOrder)
router.post('/addOrderErp', addOrderErp)

module.exports = router;