const mongoose = require('mongoose');
require('dotenv').config();

const connectOrderDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.ORDER_DB_URI);
        console.log('Order Database connected');
        return conn;
    } catch (error) {
        console.error('Order Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectOrderDB;