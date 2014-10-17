var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Represents single quiz asset
 *
 * @type {Schema}
 */
var QuizAsset = new Schema({
    cases: {
        type: Object,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }
});

/**
 * Virtual getter for cases with supplied locale
 * In case of locale is not provided then it will return direct cases regardless to supplied locale
 *
 * @param {String} [lang]
 * @return {Array}
 */
/*QuizCategory.virtual( "cases", function( lang ){
    lang = lang || "en";

    var localeCases = this.localeCases,
        cases;

    if ( Array.isArray( localeCases ) ){
        return localeCases;
    }

    cases = localeCases[lang];

    if ( ! cases ){
        console.warn( "Requested cases for '%s' locale is not found", lang );
        return [];
    }

    return cases;
});*/

var QuizCategory = new Schema({
    title: {
        type: Object,
        required: true
    },
    thumbnail: String,
    assets: [QuizAsset]
});

/**
 * Virtual getter for title with supplied locale
 *
 * @param {String} [lang]
 * @return {String}
 */
/*QuizCategory.virtual( "title", function( lang ){
    lang = lang || "en";

    var title = this.titles[lang];

    if ( ! title ){
        console.warn( "Requested category title for '%s' locale is not found", lang );
        return "";
    }

    return title;
});*/

mongoose.model( "QuizCategory", QuizCategory );
mongoose.model( "QuizAsset", QuizAsset );