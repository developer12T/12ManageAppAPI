const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// console.log(sequelize);
// require('dotenv').config()
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize(process.env.DATA_DB, process.env.USER_NAME_DATABASE_MS_SQL, process.env.PASSWORD_DATABASE_MS_SQL, {
//   host: process.env.SERVER_DATABASE_MS_SQL,
//   dialect: 'mssql'
// })

const Customer = sequelize.define('data_customer_cm_test', {
    OKCUNO: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    OKCUCL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKALCU: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCUNM: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCUA1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCUA2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCUA3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCUA4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKPHNO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKSMCD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKORTP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKWHLO: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    OKSDST: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    OKPYNO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKFRE1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKPONO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCFC1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCFC3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCFC4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKCFC6: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKVRNO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKECAR: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OKTOWN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OPGEOX: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    OPGEOY: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    REMARK: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CHANNEL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    STATUS: {
        type: DataTypes.STRING,
        allowNull: false
    },
    STORE_DATE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    INSERT_AT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UPDATE_AT: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Customer;