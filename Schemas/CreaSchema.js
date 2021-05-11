const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const CreaSchema = new mongoose.Schema({
    "@ID": {
        type: String,
        required: true
    },
    "@LastUpdated": {
        type: String,
        required: true
    },
    "ListingID": {
        type: String,
        required: true
    },
    "Address": {
        StreetAddress: { type: String, required: true },
        AddressLine1: { type: String, required: true },
        City: {type: String, required: true },
        Province: { type: String, required: true },
        PostalCode: { type: String, required: true },
        Country: { type: String, required: true }
    },
    "AgentDetails": mongoose.Schema.Types.Mixed,
    "Price": {
        type: String,
        required: true
    },
    "PropertyType": {
        type: String,
        required: true
    }
});

const CreaModel = mongoose.model('CreaModel', CreaSchema, 'CreaModel');
module.exports = CreaModel;