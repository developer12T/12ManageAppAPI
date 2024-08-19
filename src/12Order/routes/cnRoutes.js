const express = require('express');
const { getCnOrderCm, getCnOrderCmDetail } = require('../controllers/cnController');

const router = express.Router();

router.get('/getCnOrderCm', getCnOrderCm)
router.post('/getCnOrderCmDetail', getCnOrderCmDetail)

module.exports = router
