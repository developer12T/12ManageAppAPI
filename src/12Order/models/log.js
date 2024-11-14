const mongoose = require('mongoose')

const logSchema = mongoose.Schema(
    {
        system: { type: String },
        module: { type: String },
        timestamp: { type: Date, default: Date.now },
        data: { type: Object, required: true },
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    })

const Logs = mongoose.model('Logs', logSchema)
module.exports = Logs 