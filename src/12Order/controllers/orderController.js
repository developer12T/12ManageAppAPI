const axiosInstance = require('../../utils/axiosInstance');

exports.getOrderCms = async (req, res, next) => {
    try {
        const response = await axiosInstance.get('/order/getAll');
        console.log('555');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        next(error); 
    }
};
