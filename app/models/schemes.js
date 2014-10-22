var mongoose  = require( 'mongoose' ),
    constants = require( "../../config/constants.js" ),
    Schema    = mongoose.Schema;

/**
 * Getter for locale field
 * Syntax:
 *      { "locale0": <value>, "locale1": <value>, ... "localeN": <value> }
 *
 * @param {Object} value
 * @returns {*}
 */
function getLocaleField( value ){
    var primaryLocale = constants.PRIMARY_LOCALE,
        locale;

    if ( typeof value !== "object" ){
        return value;
    }

    if ( value.hasOwnProperty( primaryLocale ) ){
        console.log( "ALL locale is found, value: ", value );
        return value[primaryLocale];
    }

    locale = Object.getOwnPropertyNames( value )[0];

    if ( ! locale ){
        console.warn( "Locale field is empty object, document: ", this );
        return value;
    }

    return value[locale];
}

/**
 * Represents single quiz asset
 *
 * @type {Schema}
 */
var QuizAsset = new Schema({
    cases: {
        type: Object,
        required: true,
        get: getLocaleField
    },
    target: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }
}, { id: false });

QuizAsset.set('toJSON', { getters: true });

/**
 * Represents single category item
 *
 * @type {Schema}
 */
var QuizCategory = new Schema({
    title: {
        type: Object,
        required: true,
        get: getLocaleField
    },
    thumbnail: {
        type: String,
        default: constants.CATEGORY_DEFAULT_THUMBNAIL
    },
    assets: [QuizAsset]
}, { id: false });

QuizCategory.set('toJSON', { getters: true });

mongoose.model( "QuizCategory", QuizCategory );
mongoose.model( "QuizAsset", QuizAsset );