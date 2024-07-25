const axiosInstance = require('../../utils/axiosInstance')

exports.getOrderCm = async (req, res, next) => {
    try {
        const response = await axiosInstance.get('/order/getAll')
        res.status(200).json(response.data)
    } catch (error) {
        console.error('Error fetching data from external API:', error)
        next(error); 
    }
};

exports.getOrderCmDetail = async (req, res, next) => {
    try {
        const { orderNo } = req.body
        const response = await axiosInstance.post('/order/getDetail', { orderNo })
        res.status(200).json([response.data])
    } catch (error) {
        console.error('Error fetching data from external API:', error)
        next(error); 
    }
};
