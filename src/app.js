const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const orderRoutes = require('./12Order')
const erpRoutes = require('./12Erp')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors({
    origin: '*',
}));

// Routes
app.use('/api', orderRoutes)
app.use('/api', erpRoutes)

// Error handling middleware
app.use(errorHandler)

module.exports = app
