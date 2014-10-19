var mongoose = require( "mongoose" );

var QuizAsset    = mongoose.model( "QuizAsset", "quizzes" ),
    QuizCategory = mongoose.model( "QuizCategory", "quizzes" );

module.exports = {
    categoryList: function( locale ){
        locale = locale || "en";

        return QuizCategory.find()
                           .select( "title." + locale )
                           .exec();
    },

    assets: function( id, level, locale ){
        locale = locale || "en";
        level  = level || 1;

        return QuizCategory.find()
                           .where( "_id" ).equals( id )
                           .where( "assets.level" ).equals( level )
                           .select( "assets.cases." + locale )
                           .exec();
    }
};