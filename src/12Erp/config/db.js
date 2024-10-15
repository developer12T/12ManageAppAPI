const { Sequelize, QueryTypes, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATA_DB,
    process.env.USER_NAME_DATABASE_MS_SQL,
    process.env.PASSWORD_DATABASE_MS_SQL,
    {
        host: process.env.SERVER_DATABASE_MS_SQL,
        dialect: 'mssql'
    }
);

module.exports = { sequelize, QueryTypes, DataTypes }; 