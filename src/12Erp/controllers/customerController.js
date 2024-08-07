const axios = require('axios');
const Customer = require('../models/customer');

exports.syncCustomer = async (req, res, next) => {
    try {
        const { data } = await axios.post(`${process.env.CMS_API_BASE_URL}/store/getStoreNewtoM3`);

        for (const customer of data) {
            const {
                storeId,
                name,
                route,
                type,
                tel,
                taxId,
                address1,
                address2,
                address3,
                postCode,
                provinceCode,
                town,
                area,
                zone,
                saleCode,
                salePayer,
                lat,
                long,
                channel,
                note,
                created
            } = customer;

            const newCustomer = {
                OKCUNO: storeId,
                OKCUCL: channel,
                OKALCU: name.slice(0, 10),
                OKCUNM: name,
                OKCUA1: address1,
                OKCUA2: address2,
                OKCUA3: address3,
                OKCUA4: name.slice(37, 36),
                OKPHNO: tel,
                OKSMCD: saleCode,
                OKORTP: 'M31',
                OKWHLO: '117',
                OKSDST: zone,
                OKPYNO: salePayer,
                OKFRE1: postCode,
                OKPONO: postCode,
                OKCFC1: area,
                OKCFC3: route,
                OKCFC4: area,
                OKCFC6: type,
                OKVRNO: taxId,
                OKECAR: provinceCode,
                OKTOWN: town,
                OPGEOX: lat,
                OPGEOY: long,
                CHANNEL: 'CMS',
                REMARK: note,
                STATUS: '0',
                STORE_DATE: created,
                INSERT_AT: new Date().toISOString(),
                UPDATE_AT: new Date().toISOString()
            };

            await Customer.create(newCustomer);

            await axios.post(`${process.env.CMS_API_BASE_URL}/store/updateStatusStore`, {
                storeId: storeId,
                status: "15"
            });
        }

        res.status(200).json({ message: 'Data synced successfully' });
    } catch (error) {
        console.error('Error syncing data:', error);
        next(error);
    }
};
