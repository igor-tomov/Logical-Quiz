var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UNTITLED = "Untitled";

/**
 * Represents single quiz asset
 *
 * @type {Schema}
 */
var QuizAsset = new Schema({
    cases: {
        type: Object,
        required: true,

        /**
         * Get cases according to first retrieved locale key
         *
         * @param value
         * @returns {String}
         */
        get: function( value ){
            var locale;

            if ( Array.isArray( value ) ){
                return value;
            }

            locale = Object.getOwnPropertyNames( value )[0];

            if ( ! locale ){
                console.warn( "Requested cases for '%s' locale is not found", locale );
                return [];
            }

            return value[locale];
        }
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

var QuizCategory = new Schema({
    title: {
        type: Object,
        required: true,

        /**
         * Get title value according to first retrieved locale key
         *
         * @param value
         * @returns {String}
         */
        get: function( value ){
            var locale;

            if ( ! value ){
                return value;
            }

            if ( typeof value === "string" ){
                return value;
            }
            console.log( "value: ", value );

            locale = Object.getOwnPropertyNames( value )[0];

            if ( ! locale ){
                console.warn( "Requested category title for '%s' locale is not found", locale );
                return UNTITLED;
            }

            return value[locale];
        }
    },
    thumbnail: String,
    assets: [QuizAsset]
});

QuizCategory.set('toJSON', { getters: true });

mongoose.model( "QuizCategory", QuizCategory );
mongoose.model( "QuizAsset", QuizAsset );