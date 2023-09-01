const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);

