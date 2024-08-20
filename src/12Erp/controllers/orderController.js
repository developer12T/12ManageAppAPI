const axios = require('axios')
const Order = require('../models/order')
const { sequelize } = require('../config/db')
const { QueryTypes } = require('sequelize')

exports.syncOrders = async (req, res, next) => {
    try {
        const { data } = await axios.get('http://192.168.44.58:3009/api/orders/getOrderCm')

        data.sort((a, b) => a.orderNo.localeCompare(b.orderNo))

        const { data: seriesData } = await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/getNumberSeries', {
            series: 'ย',
            seriestype: '01',
            companycode: 410,
            seriesname: '0'
        })

        let lastNo = seriesData[0].lastno

        for (const order of data) {
            const { createDate, warehouse, note, orderNo, storeId, saleCode, list } = order
            const formattedDate = createDate.split('/').reverse().join('')

            const orno = lastNo += 1
            const test = []
            for (let index = 0; index < list.length; index++) {
                const item = list[index]

                const newOrder = {
                    OAORDT: formattedDate,
                    RLDT: formattedDate,
                    ORNO: orno,
                    CUOR: '',
                    OAORTP: 'M31',
                    WHLO: warehouse,
                    OAYREF: note,
                    FACI: 'F10',
                    OAFRE1: 'YSEND',
                    CUNO: storeId,
                    OBPONR: index + 1,
                    OBITNO: item.id,
                    OBALUN: item.unitText,
                    OBORQA: item.qty,
                    OBSAPR: item.pricePerQty,
                    OBDIA2: item.discount,
                    OBPIDE: item.type === 'free' ? item.proCode : '',
                    OBSMCD: saleCode,
                    OARESP: 'SA02',
                    STATUS: '0',
                    INSERT_AT: new Date().toISOString(),
                    UPDATE_AT: new Date().toISOString()
                }
                await Order.create(newOrder)
            }
            await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/updateNumberRunning', {
                lastno: lastNo,
                series: 'ย',
                seriestype: '01',
                companycode: 410,
                seriesname: '0'
            });

            await axios.post(`${process.env.CMS_API_BASE_URL}/order/UpdateOrder`, {
                order: orderNo,
                status: '15'
            });
        }

        res.status(200).json({ message: 'Data synced successfully' })
    } catch (error) {
        console.error('Error syncing data:', error)
        next(error)
    }
}

exports.addOrder = async (req, res, next) => {
    try {

        const { order } = req.body

        const { data: seriesData } = await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/getNumberSeries', {
            series: 'ย',
            seriestype: '01',
            companycode: 410,
            seriesname: '0'
        })

        let lastNo = seriesData[0].lastno

        for (const listData of order) {
            const { createDate, warehouse, note, orderNo, storeId, saleCode, list } = listData
            const formattedDate = createDate.split('/').reverse().join('')

            const orno = lastNo += 1

            for (let index = 0; index < list.length; index++) {
                const item = list[index]

                const newOrder = {
                    OAORDT: formattedDate,
                    RLDT: formattedDate,
                    ORNO: orno,
                    // ORNO: orderNo,
                    CUOR: '',
                    OAORTP: 'M31',
                    WHLO: warehouse,
                    OAOREF: orderNo,
                    OAYREF: note,
                    FACI: 'F10',
                    OAFRE1: 'YSEND',
                    CUNO: storeId,
                    OBPONR: index + 1,
                    OBITNO: item.id,
                    OBALUN: item.unitText,
                    OBORQA: item.qty,
                    OBSAPR: item.pricePerQty,
                    OBDIA2: item.discount,
                    OBPIDE: item.type === 'free' ? item.proCode : '',
                    OBSMCD: saleCode,
                    OARESP: 'SA02',
                    STATUS: '0',
                    INSERT_AT: new Date().toISOString(),
                    UPDATE_AT: new Date().toISOString()
                };

                await Order.create(newOrder)
            }

            const requestTimeout = 1 * 60 * 3000
            await sequelize.query('EXEC [DATA_API_TOHOME].[dbo].[DATA_API_SEND_ORDER_CM] @orderNo = :param1', {
                timeout: requestTimeout,
                replacements: {
                    param1: orno,
                }
            }).catch(error => {
                console.error('Error executing DATA_API_SEND_ORDER_CM:', error)
                throw new Error('Failed to execute stored procedure DATA_API_SEND_ORDER_CM')
            })

            // await sequelize.query('EXEC [DATA_API_TOHOME].[dbo].[TEST_DATA_API_SEND_ORDER_CM] @orderNo = :param1', {
            //     timeout: requestTimeout,
            //     replacements: {
            //         param1: orno,
            //     }
            // }).catch(error => {
            //     console.error('Error executing TEST_DATA_API_SEND_ORDER_CM:', error)
            //     throw new Error('Failed to execute stored procedure TEST_DATA_API_SEND_ORDER_CM')
            // })

            // await sequelize.query('EXEC [DATA_API_TOHOME].[dbo].[DATA_API_SEND_ORDER_CASH2] @orderNo = :param1', {
            //     timeout: requestTimeout,
            //     replacements: {
            //         param1: orderNo,
            //     }
            // }).catch(error => {
            //     console.error('Error executing DATA_API_SEND_ORDER_CASH:', error)
            //     throw new Error('Failed to execute stored procedure DATA_API_SEND_ORDER_CASH')
            // })
            // await sequelize.query('EXEC [DATA_API_M3].[dbo].[INSERT_ORDER_M3] @channel = :param1', {
            //     timeout: requestTimeout,
            //     replacements: {
            //         param1: 'CASH',
            //     }
            // }).catch(error => {
            //     console.error('Error executing INSERT_ORDER_M3:', error)
            //     throw new Error('Failed to execute stored procedure INSERT_ORDER_M3')
            // })

            // test
            // const requestTimeout = 1*60*1000; 
            // await sequelize.query('EXEC [DATA_API_TOHOME].[dbo].[TEST_DATA_API_SEND_ORDER_CASH]', {
            // }).catch(error => {
            //     console.error('Error executing DATA_API_SEND_ORDER_CASH:', error)
            //     throw new Error('Failed to execute stored procedure DATA_API_SEND_ORDER_CASH')
            // })

            // await sequelize.query('EXEC [DATA_API_M3].[dbo].[TEST_INSERT_ORDER_M3] @channel = :param1', {
            //     timeout: requestTimeout,
            //     replacements: {
            //         param1: 'CASH',
            //     }
            // }).catch(error => {
            //     console.error('Error executing INSERT_ORDER_M3:', error)
            //     throw new Error('Failed to execute stored procedure INSERT_ORDER_M3')
            // })

            await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/updateNumberRunning', {
                lastno: lastNo,
                series: 'ย',
                seriestype: '01',
                companycode: 410,
                seriesname: '0'
            })

            await axios.post(`${process.env.CMS_API_BASE_URL}/order/UpdateOrder`, {
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

exports.addOrderErp = async (req, res, next) => {
    try {
        const { order } = req.body


        for (const listData of order) {
            const { orderNo } = listData

            const requestTimeout = 1 * 60 * 3000;
            await sequelize.query('EXEC [DATA_API_M3].[dbo].[INSERT_ORDER_CM] @channel = :param1, @orderNo = :param2', {
                timeout: requestTimeout,
                replacements: {
                    param1: 'CASH',
                    param2: orderNo
                }
            }).catch(error => {
                console.error('Error executing INSERT_ORDER_M3:', error)
                throw new Error('Failed to execute stored procedure INSERT_ORDER_M3')
            })

            // await sequelize.query('EXEC [DATA_API_M3].[dbo].[TEST_INSERT_ORDER_CM] @channel = :param1, @orderNo = :param2', {
            //     timeout: requestTimeout,
            //     replacements: {
            //         param1: 'CASH',
            //         param2: orderNo
            //     }
            // }).catch(error => {
            //     console.error('Error executing INSERT_ORDER_M3:', error)
            //     throw new Error('Failed to execute stored procedure INSERT_ORDER_M3')
            // })

            // const requestTimeout = 1*60*1000; 
            // await sequelize.query('EXEC [DATA_API_M3].[dbo].[TEST_INSERT_ORDER_M3] @channel = :param1', {
            //     timeout: requestTimeout,
            //     replacements: {
            //         param1: 'CASH',
            //     }
            // }).catch(error => {
            //     console.error('Error executing INSERT_ORDER_M3:', error)
            //     throw new Error('Failed to execute stored procedure INSERT_ORDER_M3')
            // })

            await axios.post(`${process.env.CMS_API_BASE_URL}/order/UpdateOrder`, {
                order: orderNo,
                status: '20'
            })
        }

        res.status(200).json({ message: 'Order created and synced successfully' })
    } catch (error) {
        console.error('Error creating order:', error)
        next(error)
    }
}