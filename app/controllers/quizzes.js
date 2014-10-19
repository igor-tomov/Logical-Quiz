var express     = require('express'),
    mongoose    = require("mongoose"),
    quizModel   = require('../models/quizzes'),
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

router.get( "/quizzes/category_list", function( req, res ){
    quizModel.categoryList()
             .addBack(function( err, data ){
                if (err) throw err;

                sendJSON( res, data );
             });
});

router.get( "/quizzes/assets/:category_id", function( req, res ){
    quizModel.assets( req.params.category_id, req.query.level )
             .addBack(function( err, data ){
                if (err) throw err;

                sendJSON( res, data );
             });
});