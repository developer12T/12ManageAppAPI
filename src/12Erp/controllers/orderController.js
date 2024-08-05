const axios = require('axios');
const Order = require('../models/Order');

exports.syncOrders = async (req, res, next) => {
    try {
        const { data } = await axios.get('http://192.168.44.58:3009/api/orders/getOrderCm');

        data.sort((a, b) => a.orderNo.localeCompare(b.orderNo));

        const { data: seriesData } = await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/getNumberSeriesINV', {
            series: "C",
            seriesyear: "2024",
            companycode: 410,
            seriesname: "0"
        });

        let lastNo = seriesData[0].lastno;
        const prefixNo = seriesData[0].prefixno;

        for (const order of data) {
            const { createDate, orderNo, warehouse, storeId, saleCode, list } = order;
            const formattedDate = createDate.split('/').reverse().join('');

            lastNo += 1;
            const cuor = prefixNo + lastNo;

            for (let index = 0; index < list.length; index++) {
                const item = list[index];

                const newOrder = {
                    OAORDT: formattedDate,
                    RLDT: formattedDate,
                    ORNO: orderNo,
                    CUOR: cuor,
                    OAORTP: '031',
                    WHLO: warehouse,
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

                await Order.create(newOrder);
            }

            await axios.post('http://192.168.2.97:8383/M3API/OrderManage/Order/updateNumberRunningINV', {
                lastno: lastNo,
                series: "C",
                seriesyear: "2024",
                companycode: 410,
                seriesname: "0"
            });
            
            await axios.post(`${process.env.CMS_API_BASE_URL}/order/UpdateOrder`, {
                order: orderNo,
                status: "15"
            });
        }

        res.status(200).json({ message: 'Data synced successfully' });
    } catch (error) {
        console.error('Error syncing data:', error);
        next(error);
    }
};
