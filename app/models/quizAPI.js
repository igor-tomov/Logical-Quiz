var mongoose  = require( "mongoose" ),
    constants = require( "../../config/constants.js" );

var QuizAsset    = mongoose.model( "QuizAsset", "quizzes" ),
    QuizCategory = mongoose.model( "QuizCategory", "quizzes" );

module.exports = {
    categoryList: function( locale ){
        locale = locale || constants.DEFAULT_LOCALE;

        return QuizCategory.find()
                           .select( "title." + locale )
                           .exec();
    },

    assets: function( id, level, locale ){
        locale = locale || constants.DEFAULT_LOCALE;
        level  = level || 1;

        return QuizCategory.findOne({ _id: id })
                           .where( "assets.level" ).equals( level )
                           .limit( constants.QUIZ_ASSET_COUNT )
                           .select( "assets.target assets.cases.all assets.cases." + locale )
                           .exec();
    }
};