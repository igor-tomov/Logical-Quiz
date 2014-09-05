var express     = require('express'),
    router      = express.Router(),
    fs          = require("fs");/*,
    mongoose    = require('mongoose'),
    Quiz        = mongoose.model('Quiz');*/

module.exports = function (app) {
    app.use('/', router);
};

router.get( "/quiz/demo", function( req, res, next ){
    /*Quiz.find()
        .select( {_id: false, __v: false} )
        .exec( function( err, quiz ){
            if (err) return console.error(err);

            res.setHeader( "Content-Type", "application/json" );
            res.end( JSON.stringify( quiz ) );
        });*/

    fs.readFile( "quizzes.json", {encoding: "UTF-8"}, function( err, data ){
        if ( err ){
            throw err;
        }

        res.setHeader( "Content-Type", "application/json" );
        res.end( data );
    });
});