var express     = require('express'),
    quizModel   = require('../models/quizzes'),
    router      = express.Router();

var mongoose = require( "mongoose" );

var QuizAsset    = mongoose.model( "QuizAsset" ),
    QuizCategory = mongoose.model( "QuizCategory" );

module.exports = function (app) {
    app.use('/', router);
};

router.get( "/quizzes/category_list", function( req, res, next ){
    /*quizModel.categoryList()
             .then(function( err, data ){
                if (err) return console.error(err);

                res.setHeader( "Content-Type", "application/json" );
                res.end( JSON.stringify( data ) );
             });*/

    QuizCategory.find()
                .exec(function( err, data ){
                    if (err) return console.error(err);

                    res.setHeader( "Content-Type", "application/json" );
                    res.end( JSON.stringify( data ) );
                });
});