const { Sequelize, QueryTypes, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATA_DB_F,
    process.env.USER_NAME_DATABASE_MS_SQL_F,
    process.env.PASSWORD_DATABASE_MS_SQL_F,
    {
        host: process.env.SERVER_DATABASE_MS_SQL_F,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                enableArithAbort: false,
                encrypt: false,
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1',
                },
            },
        }
    }
);

module.exports = { sequelize, QueryTypes, DataTypes }; 