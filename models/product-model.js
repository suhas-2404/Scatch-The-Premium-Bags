const { text } = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount:{
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    isNew: {
        type: Boolean,
        default: false  // New products default to false
    }
});

module.exports = mongoose.model('Product', productSchema);