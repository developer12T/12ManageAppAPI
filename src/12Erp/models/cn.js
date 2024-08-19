const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CN = sequelize.define('data_cn_cm', {
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
        allowNull: true
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

module.exports = CN