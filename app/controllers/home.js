var express   = require('express'),
    config    = require('../../config/config'),
    constants = require('../../config/constants'),
    path      = require('path'),
    rootPath  = path.normalize(__dirname + '/../..'),
    React     = require('react'),
    router    = express.Router();

var reactConfig = require( "../../config/react-config" );

// load React components
var headerView = require( reactConfig.header );

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res) {
    var locale = require( reactConfig.getLocaleFilename( req.cookies[constants.LOCALE_COOKIE_NAME] ) ); //todo: must be refactored

    res.render('index', {
        title: 'Logical quiz',
        version: config.pkg.version,
        header: React.renderToString( headerView()({ locale: locale["header-layer"] }) ),
        env: process.env.NODE_ENV || "development"
    });
});

// public access to constants.js
router.get('/js/constants.js', function (req, res) {
    res.sendFile( rootPath + "/config/constants.js" );
});