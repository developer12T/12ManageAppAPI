// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// console.log(sequelize);
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATA_DB, process.env.USER_NAME_DATABASE_MS_SQL, process.env.PASSWORD_DATABASE_MS_SQL, {
  host: process.env.SERVER_DATABASE_MS_SQL,
  dialect: 'mssql'
})

const Order = sequelize.define('data_order_cm', {
    OAORDT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RLDT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ORNO: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    CUOR: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    OAORTP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    WHLO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FACI: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OAFRE1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OAOREF: {
        type: DataTypes.STRING
    },
    OAYREF: {
        type: DataTypes.STRING
    },
    CUNO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ADID: {
        type: DataTypes.STRING
    },
    OBPONR: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    OBITNO: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    OBALUN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OBORQA: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    OBSAPR: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    OBDIA2: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    OBPIDE: {
        type: DataTypes.STRING
    },
    OBSMCD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OARESP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    STATUS: {
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

module.exports = Order;