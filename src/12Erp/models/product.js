const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbFplus');

const Product = sequelize.define('MASPRD', {
    MMITNO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MMFUDS: {
        type: DataTypes.STRING,
        allowNull: false
    },
    InspecCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MTTRQT: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    WHL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ShelfLife: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Lot: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LMMFDT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LMQIAD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LMEXPI: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LMSEDT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LMBBDT: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Item_Status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    BBE: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Product;