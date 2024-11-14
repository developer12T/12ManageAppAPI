const express = require('express')
const { log } = require('../controllers/logController')

const router = express.Router();

router.post('/log', log)

module.exports = router