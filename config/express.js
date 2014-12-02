var fs = require('fs');
var express = require('express');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var constants = require('./constants');

module.exports = function(app, config) {
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());


    // Load locale files
    var localePath = config.root + '/public/locale',
        localeMap  = {};

    fs.readdirSync(localePath).forEach(function (file) {
        if (file.indexOf(constants.LOCALE_EXTENSION) >= 0) {
            localeMap[ file.replace( constants.LOCALE_EXTENSION, '' ) ] = require(localePath + '/' + file);
        }
    });


    // determine locale data
    app.use(function( req, res, next ){//todo: add reading locale data from "Accept-Language"
        var localeName = req.cookies[constants.LOCALE_COOKIE_NAME];

        if ( localeName && localeMap[localeName] ){
            req.locale = localeMap[localeName];
        }else{
            req.locale = localeMap[constants.DEFAULT_LOCALE];
        }

        next();
    });

    // Load app controllers
    var controllersPath = config.root + '/app/controllers';

    fs.readdirSync(controllersPath).forEach(function (file) {
        if (file.indexOf('.js') >= 0) {
            require(controllersPath + '/' + file)(app);
        }
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if(app.get('env') === 'development'){
        app.use(function (err, req, res) {
          res.status(err.status || 500);
          res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
          });
    });
}

    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {},
          title: 'error'
        });
    });
};
