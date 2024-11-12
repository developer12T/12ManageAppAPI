const axios = require('axios');
const Product = require('../models/product');
const { Op } = require('sequelize');

exports.getProductLot = async (req, res, next) => {
    try {
        const { itemNo, itemExp } = req.body;

        const [year, month, day] = itemExp.split('/');
        const date = new Date(year, month - 1, day);

        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        let data = await Product.findOne({
            attributes: ['Lot'],
            where: {
                MMITNO: itemNo,
                BBE: itemExp
            }
        });

        if (data) {
            return res.status(200).json([{ Lot: data.Lot, Status: "1" }]);
        }

        data = await Product.findOne({
            attributes: ['Lot'],
            where: {
                MMITNO: itemNo,
                LMBBDT: itemExp
            }
        });

        if (data) {
            return res.status(200).json([{ Lot: data.Lot, Status: "1" }]);
        }

        data = await Product.findOne({
            attributes: ['Lot'],
            where: {
                MMITNO: itemNo,
                BBE: {
                    [Op.between]: [startOfMonth, endOfMonth] 
                }
            }
        });

        if (data) {
            return res.status(200).json([{ Lot: data.Lot, Status: "0" }]);
        } else {
            return res.status(200).json([{ Lot: null, Status: "0" }]);
        }

    } catch (error) {
        console.error('Error syncing data:', error);
        next(error);
    }
};
