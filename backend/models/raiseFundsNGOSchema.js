const mongoose = require('mongoose');

const raiseFundsNGOSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cause: { type: String, required: true },
    targetFunds: { type: Number, required: true },
    heroImage: { type: String, required: true },
    images: { type: [String], required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('RaiseFundsNGO', raiseFundsNGOSchema);