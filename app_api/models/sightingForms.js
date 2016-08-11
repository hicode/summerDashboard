var mongoose = require('mongoose');

var sightingDataSchema = new mongoose.Schema({
    number: Number,
    task: String,
    checkboxNo: Boolean,
    checkboxYes: Boolean,
    action: String
});

mongoose.model('SightingForm', sightingDataSchema);