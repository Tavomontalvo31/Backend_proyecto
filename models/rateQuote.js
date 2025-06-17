const mongoose = require('mongoose');

const rateQuoteSchema = mongoose.Schema({
    Origin: {
        city: {
            type: String,
            required: true,
        },
        stateOrProvince: {
            type: String,
            required: true,
        },
        Zipcode: {
            type: Number,
            required: true,
        },
    },
    Destination: {
        city: {
            type: String,
            required: true,
        },
        stateOrProvince: {
            type: String,
            required: true,
        },
        Zipcode: {
            type: Number,
            required: true,
        },
    },
    Items: {
        Handling_unit: {
            type: String,
            required: true,
        },
        Quantity: {
            type: Number,
            required: true,
        },
        Dimensions: {
            Width: {
                type: Number,
                required: true,
            },
            Height: {
                type: Number,
                required: true,
            },
            Length: {
                type: Number,
                required: true,
            },
            Class: {
                type: Number,
                required: true,
            },
            Weight: {
                type: Number,
                required: true,
            },
        },
    },
})

module.exports = mongoose.model('rateQuote', rateQuoteSchema);