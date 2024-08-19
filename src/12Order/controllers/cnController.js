const axiosInstance = require('../../utils/axiosInstance')
const axios = require('axios')

exports.getCnOrderCm = async (req, res, next) => {
    try {
        const response = await axiosInstance.get('/cnOrder/getAll')
        res.status(200).json(response.data)
    } catch (error) {
        console.error('Error fetching data from external API:', error)
        next(error); 
    }
};

exports.getCnOrderCmDetail = async (req, res, next) => {
    try {
        const { orderNo } = req.body
        const response = await axiosInstance.post('/cnOrder/getDetail', { orderNo })
        res.status(200).json([response.data])
    } catch (error) {
        console.error('Error fetching data from external API:', error)
        next(error); 
    }
};