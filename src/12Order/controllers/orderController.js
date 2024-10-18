const axiosInstance = require('../../utils/axiosInstance')
const axios = require('axios')

exports.getOrderCm = async (req, res, next) => {
    try {
        const { status } = req.query
        // console.log('Status:', status)
        if (!status) {
            return res.status(400).json({ message: "Status query parameter is required." })
        }

        const response = await axiosInstance.get('/order/getAll', {
            params: { status }
        })

        const orders = response.data

        const stockData = []

        const { data: warehouseStockData } = await axios.post('http://192.168.2.97:8383/M3API/StockManage/Stock/getStockAll', {
            warehouse: '105'
        })
        stockData.push(...warehouseStockData)

        for (let order of orders) {
            let send = true

            const groupedItems = order.list.reduce((acc, item) => {
                if (!acc[item.id]) {
                    acc[item.id] = 0
                }
                acc[item.id] += item.qtyPcs
                return acc
            }, {})

            for (let itemId in groupedItems) {
                const stockItem = stockData.find(stock => stock.itemcode === itemId)

                if (stockItem) {
                    const availableStock = stockItem.available
                    const requiredQty = groupedItems[itemId]

                    if (requiredQty > availableStock) {
                        send = false
                        break;
                    }
                } else {
                    send = false
                    break;
                }
            }
            order.send = send
        }

        res.status(200).json(orders)
    } catch (error) {
        console.error('Error fetching data from external API:', error)
        next(error)
    }
}

exports.getOrderCmDetail = async (req, res, next) => {
    try {
        const { orderNo } = req.body

        const response = await axiosInstance.post('/order/getDetail', { orderNo })
        const orderDetail = response.data


        const { data: stockData } = await axios.post('http://192.168.2.97:8383/M3API/StockManage/Stock/getStockAll', {
            warehouse: '105'
        })

        for (let item of orderDetail.list) {
            const stockItem = stockData.find(stock => stock.itemcode === item.id)

            if (stockItem) {
                const availableStock = stockItem.available
                const requiredQtyPcs = item.qtyPcs

                item.stock = requiredQtyPcs <= availableStock
            } else {
                item.stock = false
            }
        }

        res.status(200).json([orderDetail])
    } catch (error) {
        console.error('Error fetching data from external API:', error)
        next(error)
    }
}


// exports.summaryOrder = async (req, res, next) => {
//     try {
//         const orders = req.body;

//         const summarizedOrders = await Promise.all(orders.map(async order => {
//             const summarizedList = [];

//             for (let item of order.list) {

//                 let conversionData;
//                 try {
//                     const response = await axios.post('http://192.168.2.97:8383/M3API/ItemManage/Item/getItemConvertItemcode', {
//                         itcode: item.id
//                     });
//                     conversionData = response.data[0].type;
//                 } catch (error) {
//                     console.warn(`No conversion data found for item: ${item.id}, defaulting to PCS`);
//                     conversionData = [{ unit: 'PCS', factor: 1 }];
//                 }

//                 const convertedUnits = convertToUnits(item.qtyPcs, conversionData);

//                 const existingItem = summarizedList.find(i => i.id === item.id);

//                 if (existingItem) {
//                     existingItem.qtyPcs += item.qtyPcs;
//                     existingItem.convertedUnits = convertToUnits(existingItem.qtyPcs, conversionData);
//                 } else {
//                     const { id, name, qty, qtyPcs } = item;
//                     summarizedList.push({ 
//                         id,
//                         name,
//                         qty,
//                         qtyPcs,
//                         convertedUnits 
//                     });
//                 }
//             }

//             return {
//                 orderNo: order.orderNo,
//                 saleMan: order.saleMan,
//                 saleCode: order.saleCode,
//                 area: order.area,
//                 storeId: order.storeId,
//                 storeName: order.storeName,
//                 address: order.address,
//                 taxID: order.taxID,
//                 tel: order.tel,
//                 warehouse: order.warehouse,
//                 note: order.note,
//                 createDate: order.createDate,
//                 list: summarizedList 
//             };
//         }));

//         res.status(200).json(summarizedOrders);
//     } catch (error) {
//         console.error('Error summarizing orders:', error);
//         next(error);
//     }
// };

// exports.summaryAll = async (req, res, next) => {
//     try {
//         const orders = req.body;

//         const summarizedList = [];

//         for (let order of orders) {
//             for (let item of order.list) {
//                 let conversionData;
//                 try {
//                     const response = await axios.post('http://192.168.2.97:8383/M3API/ItemManage/Item/getItemConvertItemcode', {
//                         itcode: item.id
//                     });
//                     conversionData = response.data[0].type
//                 } catch (error) {
//                     console.warn(`No conversion data found for item: ${item.id}, defaulting to PCS`)
//                     conversionData = [{ unit: 'PCS', factor: 1 }];
//                 }

//                 const convertedUnits = convertToUnits(item.qtyPcs, conversionData)

//                 const existingItem = summarizedList.find(i => i.id === item.id)

//                 if (existingItem) {
//                     existingItem.qtyPcs += item.qtyPcs
//                     existingItem.convertedUnits = convertToUnits(existingItem.qtyPcs, conversionData)
//                 } else {
//                     const { id, name, qty, qtyPcs } = item
//                     summarizedList.push({ 
//                         id,
//                         name,
//                         qty,
//                         qtyPcs,
//                         convertedUnits 
//                     });
//                 }
//             }
//         }

//         res.status(200).json(summarizedList)
//     } catch (error) {
//         console.error('Error summarizing all orders:', error)
//         next(error)
//     }
// }

exports.summaryOrder = async (req, res, next) => {
    try {
        const orders = req.body;

        const summarizedOrders = orders.map(order => {
            const summarizedList = [];

            let totalLarge = 0
            let totalMedium = 0
            let totalSmall = 0

            for (let item of order.list) {
                const convertedUnits = convertToUnits(item.qty, item.unitText)

                const existingItem = summarizedList.find(i => i.id === item.id)

                if (existingItem) {
                    existingItem.qtyPcs += item.qtyPcs
                    existingItem.convertedUnits = mergeConvertedUnits(existingItem.convertedUnits, convertedUnits)
                } else {
                    const { id, name, qty, qtyPcs } = item
                    summarizedList.push({
                        id,
                        name,
                        qty,
                        qtyPcs,
                        convertedUnits
                    })
                }

                totalLarge += convertedUnits.large.qty
                totalMedium += convertedUnits.medium.qty
                totalSmall += convertedUnits.small.qty
            }

            return {
                orderNo: order.orderNo,
                saleMan: order.saleMan,
                saleCode: order.saleCode,
                area: order.area,
                storeId: order.storeId,
                storeName: order.storeName,
                address: order.address,
                taxID: order.taxID,
                tel: order.tel,
                warehouse: order.warehouse,
                note: order.note,
                createDate: order.createDate,
                list: summarizedList,
                totalList: {
                    large: totalLarge,
                    medium: totalMedium,
                    small: totalSmall
                }
            }
        })

        res.status(200).json(summarizedOrders)
    } catch (error) {
        console.error('Error summarizing orders:', error)
        next(error)
    }
}

exports.summaryAll = async (req, res, next) => {
    try {
        const orders = req.body

        const summarizedList = []

        let totalLarge = 0
        let totalMedium = 0
        let totalSmall = 0

        for (let order of orders) {
            for (let item of order.list) {
                const convertedUnits = convertToUnits(item.qty, item.unitText)

                const existingItem = summarizedList.find(i => i.id === item.id)

                if (existingItem) {
                    existingItem.qtyPcs += item.qtyPcs;
                    existingItem.convertedUnits = mergeConvertedUnits(existingItem.convertedUnits, convertedUnits)
                } else {
                    const { id, name, qty, qtyPcs } = item
                    summarizedList.push({
                        id,
                        name,
                        qty,
                        qtyPcs,
                        convertedUnits
                    })
                }

                totalLarge += convertedUnits.large.qty
                totalMedium += convertedUnits.medium.qty
                totalSmall += convertedUnits.small.qty
            }
        }

        summarizedList.sort((a, b) => a.id.localeCompare(b.id))

        const response = {
            list: summarizedList,
            totalList: {
                large: totalLarge,
                medium: totalMedium,
                small: totalSmall
            }
        }

        res.status(200).json(response)
    } catch (error) {
        console.error('Error summarizing all orders:', error)
        next(error)
    }
}

const convertToUnits = (qty, unitText) => {
    const convertedUnits = {
        large: { qty: 0 },
        medium: { qty: 0 },
        small: { qty: 0 }
    };

    if (unitText === 'CTN') {
        convertedUnits.large.qty = qty
    } else if (['BAG', 'PAC','CRT'].includes(unitText)) {
        convertedUnits.medium.qty = qty
    } else if (['PCS', 'BOT'].includes(unitText)) {
        convertedUnits.small.qty = qty
    }

    return convertedUnits
}

const mergeConvertedUnits = (existingUnits, newUnits) => {
    return {
        large: {
            qty: existingUnits.large.qty + newUnits.large.qty
        },
        medium: {
            qty: existingUnits.medium.qty + newUnits.medium.qty
        },
        small: {
            qty: existingUnits.small.qty + newUnits.small.qty
        }
    }
}
