var express  = require('express'),
    config   = require('../../config/config'),
    path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Logical quiz',
        version: config.pkg.version,
        env: process.env.NODE_ENV || "development"
    });
});

// public access to constants.js
router.get('/js/constants.js', function (req, res) {
    res.sendFile( rootPath + "/config/constants.js" );
});