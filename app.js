var express  = require('express'),
    config   = require('./config/config'),
    mongoose = require('mongoose');

// connect to database via Mongoose
mongoose.connect( config.db );

mongoose.connection.on('error', function () {
  throw new Error('Unable to connect to database at ' + config.db);
});

// load mongoose schemes
require( config.root + '/app/models/schemes' );

// init Express app
var app = express();

// apply Express config
require('./config/express')(app, config);

app.listen(config.port);

