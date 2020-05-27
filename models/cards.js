const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    id: {
        type: Object,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    creditScore: {
        type: Number,
        required: true
    },
    acctAgeYrs: {
        type: Number,
        required: true
    },
    acctAgeMos: {
        type: Number,
        required: true
    }
});

const Card = module.exports = mongoose.model('Card', CardSchema);