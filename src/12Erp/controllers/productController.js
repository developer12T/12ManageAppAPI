const axios = require('axios');
const Product = require('../models/product');

exports.getProductLot = async (req, res, next) => {
    try {
        const { itemNo, itemExp } = req.body

        const data = await Product.findAll({
            attributes: ['Lot'],
            where: {
                MMITNO: itemNo,
                LMEXPI: itemExp
            }
        });

        res.status(200).json(data);
    } catch (error) {
        console.error('Error syncing data:', error);
        next(error);
    }
};
