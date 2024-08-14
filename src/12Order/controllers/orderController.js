const axiosInstance = require('../../utils/axiosInstance')
const axios = require('axios')

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

exports.summaryOrder = async (req, res, next) => {
    try {
        const orders = req.body;

        const summarizedOrders = await Promise.all(orders.map(async order => {
            const summarizedList = [];

            for (let item of order.list) {

                let conversionData;
                try {
                    const response = await axios.post('http://192.168.2.97:8383/M3API/ItemManage/Item/getItemConvertItemcode', {
                        itcode: item.id
                    });
                    conversionData = response.data[0].type;
                } catch (error) {
                    console.warn(`No conversion data found for item: ${item.id}, defaulting to PCS`);
                    conversionData = [{ unit: 'PCS', factor: 1 }];
                }

                const convertedUnits = convertToUnits(item.qtyPcs, conversionData);

                const existingItem = summarizedList.find(i => i.id === item.id);

                if (existingItem) {
                    existingItem.qtyPcs += item.qtyPcs;
                    existingItem.convertedUnits = convertToUnits(existingItem.qtyPcs, conversionData);
                } else {
                    const { id, name, qty, qtyPcs } = item;
                    summarizedList.push({ 
                        id,
                        name,
                        qty,
                        qtyPcs,
                        convertedUnits 
                    });
                }
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
                list: summarizedList 
            };
        }));

        res.status(200).json(summarizedOrders);
    } catch (error) {
        console.error('Error summarizing orders:', error);
        next(error);
    }
};

exports.summaryAll = async (req, res, next) => {
    try {
        const orders = req.body;

        const summarizedList = [];

        for (let order of orders) {
            for (let item of order.list) {
                let conversionData;
                try {
                    const response = await axios.post('http://192.168.2.97:8383/M3API/ItemManage/Item/getItemConvertItemcode', {
                        itcode: item.id
                    });
                    conversionData = response.data[0].type;
                } catch (error) {
                    console.warn(`No conversion data found for item: ${item.id}, defaulting to PCS`);
                    conversionData = [{ unit: 'PCS', factor: 1 }];
                }

                const convertedUnits = convertToUnits(item.qtyPcs, conversionData);

                const existingItem = summarizedList.find(i => i.id === item.id);

                if (existingItem) {
                    existingItem.qtyPcs += item.qtyPcs;
                    existingItem.convertedUnits = convertToUnits(existingItem.qtyPcs, conversionData);
                } else {
                    const { id, name, qty, qtyPcs } = item;
                    summarizedList.push({ 
                        id,
                        name,
                        qty,
                        qtyPcs,
                        convertedUnits 
                    });
                }
            }
        }

        res.status(200).json(summarizedList);
    } catch (error) {
        console.error('Error summarizing all orders:', error);
        next(error);
    }
};

const convertToUnits = (qtyPcs, conversionFactors) => {
    let remainingPcs = qtyPcs;
    const convertedUnits = {
        CTN: { qty: 0 },
        BAG: { qty: 0 },
        PCS: { qty: remainingPcs } 
    };

    conversionFactors.forEach(({ unit, factor }) => {
        if (unit !== 'PCS') {
            const qty = Math.floor(remainingPcs / factor)
            remainingPcs = remainingPcs % factor
            convertedUnits[unit] = { qty }
            convertedUnits["PCS"].qty = remainingPcs
        }
    });

    return convertedUnits;
};