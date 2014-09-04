var express     = require('express'),
    router      = express.Router(),
    mongoose    = require('mongoose'),
    Quiz        = mongoose.model('Quiz');

module.exports = function (app) {
    app.use('/', router);
};

router.get( "/quiz/demo", function( req, res, next ){
    Quiz.find()
        .select( {_id: false, __v: false} )
        .exec( function( err, quiz ){
            if (err) return console.error(err);

            res.setHeader( "Content-Type", "application/json" );
            res.end( JSON.stringify( quiz ) );
        });
});