const axios = require('axios')
const CN = require('../models/cn')
const { sequelize } = require('../config/db')
const { QueryTypes } = require('sequelize')

exports.createOrder = async (req, res, next) => {
    try {
        const { order } = req.body

        const { data: seriesData } = await axios.post(`${process.env.ERP_API_BASE_URL}/master/runningNumber`, {
            coNo: 410,
            series: "ร",
            seriesType: "01"
        })

        let lastNo = seriesData.lastNo
        console.log(order)
        for (const listData of order) {
            const { orderNo } = listData

            const orno = lastNo += 1

            await axios.post(`${process.env.ERP_API_BASE_URL}/master/runningNumber/update`, {
                coNo: 410,
                series: 'ร',
                seriesType: '01',
                lastNo: lastNo,
            })

            await axios.post(`${process.env.CMS_API_BASE_URL}/cnOrder/UpdateCnOrder`, {
                order: orderNo,
                status: '15',
                co: orno
            })

        }

        res.status(200).json({ message: 'CN Order created and synced successfully' })
    } catch (error) {
        console.error('Error creating order:', error)
        next(error)
    }
}