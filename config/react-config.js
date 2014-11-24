/**
 * ReactJS specific config for NodeJS environment
 */

var constants = require( "./constants" );

// path to front-end components from controller root
var COMPONENT_ROOT = "../../public/js/new-components/";

var LOCALE_ROOT = "../../public/locale/";

module.exports = {
    getLocaleFilename: function( lang ){
        lang = lang || constants.DEFAULT_LOCALE;

        return LOCALE_ROOT + lang + constants.LOCALE_EXTENSION;
    },

    header: COMPONENT_ROOT + "header-layer/views/header.react.js"
};