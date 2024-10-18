const axios = require('axios')
const CN = require('../models/cn')
const { sequelize } = require('../config/db')
const { QueryTypes } = require('sequelize')

exports.createOrder = async (req, res, next) => {
    try {
        const { order } = req.body

        const { data: seriesData } = await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/getNumberSeries', {
            series: "ร",
            seriestype: "01",
            companycode: 410,
            seriesname: "0"
        })

        let lastNo = seriesData[0].lastno
        console.log(order)
        for (const listData of order) {
            const { createDate, warehouse, note, orderNo, storeId, saleCode, list } = listData
            const formattedDate = createDate.split('/').reverse().join('')
            console.log(formattedDate)

            const orno = lastNo += 1

            await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/updateNumberRunning', {
                lastno: lastNo,
                series: 'ร',
                seriestype: '01',
                companycode: 410,
                seriesname: '0'
            })

            await axios.post(`${process.env.CMS_API_BASE_URL}/cnOrder/UpdateCnOrder`, {
                order: orderNo,
                status: '15',
                co: orno
            })

        }

        res.status(200).json({ message: 'Order created and synced successfully' })
    } catch (error) {
        console.error('Error creating order:', error)
        next(error)
    }
}