var mongoose = require('mongoose');

var testListSchema = new mongoose.Schema({
    
    formType: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    testDescription: {
        type: String,
        required: false
    }
});

mongoose.model('TestName', testListSchema);