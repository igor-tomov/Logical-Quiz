var mongoose = require( "mongoose" );

var QuizAsset    = mongoose.model( "QuizAsset" ),
    QuizCategory = mongoose.model( "QuizCategory" );

module.exports = {
    categoryList: function(){
        return QuizCategory.find()
                           .select( "title.en" )
                           .exec();
    },

    assets: function( id, level ){

    }
};