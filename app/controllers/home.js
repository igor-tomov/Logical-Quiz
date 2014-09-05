var express = require('express'),
    config  = require('../../config/config'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'Logical quiz',
        version: config.pkg.version,
        env: process.env.NODE_ENV || "development"
    });
});