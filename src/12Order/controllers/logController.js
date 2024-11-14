const Logs = require('../models/log')

exports.log = async (req, res, next) => {
    const order = req.body
    try {
        const newLog = new Logs({
            system: order.system,
            module: order.module,
            data: order.data
            // userId: userId
        });
        await newLog.save();
        console.log("บันทึก log เรียบร้อย");
        res.status(200).json('success')
    } catch (error) {
        console.error("Error saving log to MongoDB:", error);
    }
}