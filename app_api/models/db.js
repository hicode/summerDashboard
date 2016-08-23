var mongoose = require('mongoose');
var gracefulShutdown;
// TODO: Add Database Connection for Example On Github
var dbURI = 'mongodb://XXX.XXX.XXX.XXX';

if (process.env.NODE_ENV === 'production') {
// TODO: Add Database Connection for Example On Github
    dbURI = 'mongodb://XXX.XXX.XXX.XXX';
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};


// BRING IN YOUR SCHEMAS & MODELS
require('./locations');
