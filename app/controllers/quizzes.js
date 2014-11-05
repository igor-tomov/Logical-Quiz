var express     = require('express'),
    mongoose    = require("mongoose"),
    quizModel   = require('../models/quizAPI'),
    constants   = require( "../../config/constants.js" ),
    router      = express.Router();

// Load mongoose model
var QuizAsset    = mongoose.model( "QuizAsset" ),
    QuizCategory = mongoose.model( "QuizCategory", "quizzes" );

function sendJSON( res, data ){
    res.setHeader( "Content-Type", "application/json; charset=UTF-8" );
    res.end( JSON.stringify( data ) );
}

module.exports = function (app) {
    app.use('/', router);
};

/**
 * Allow XMLHttpRequest requests only
 */
/*router.use(function( req, res, next ){
    if ( req.xhr ){
        next();
    }else{
        res.status( 404 )
           .end();
    }
});*/

router.get( "/quiz/subjects", function( req, res ){
    quizModel.categoryList( req.cookies[constants.LOCALE_COOKIE_NAME] )
             .addBack(function( err, data ){
                if (err) throw err;

                sendJSON( res, data );
             });
});

router.get( "/quiz/subjects/:subject_id", function( req, res ){
    quizModel.assets( req.params.subject_id, req.query.level, req.cookies[constants.LOCALE_COOKIE_NAME]  )
             .addBack(function( err, data ){
                if (err) throw err;

                sendJSON( res, data.assets );
             });
});