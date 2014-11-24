define( [ "constants", "jquery" ], function( constants, $ ){

    /** constants */
    var LOCALE_PATH      = "/locale/",
        LOCALE_EXTENSION = '.json';

    /**
     * Get cookie by name
     *
     * @param {String} name
     * @returns {string}
     */
    function getCookie( name ) {
        var cookie = ( this.document || {} ).cookie,
            start, end;

        if ( cookie.length > 0 ){
            start = cookie.indexOf( name + "=" );

            if ( start != -1 ) {
                start = start + name.length + 1;
                end   = cookie.indexOf( ";", start );

                if ( end == -1 ) {
                    end = cookie.length;
                }

                return decodeURIComponent( cookie.substring( start, end ) );
            }
        }
        return "";
    }

    return function( app ){
        var basePrototype = app.core.Components.Base.prototype,
            localeURL     = LOCALE_PATH + ( getCookie( constants.LOCALE_COOKIE_NAME ) || constants.DEFAULT_LOCALE ) + constants.LOCALE_EXTENSION,
            localeStorage = {};

        /**
         * Get locale data for current component
         *
         * @returns {Object}
         */
        basePrototype.getLocale = function(){
            return localeStorage[this.options.name] || {};
        };

        return $.getJSON( localeURL )// load locale data
                .done(function( response ){
                    localeStorage = response;
                });
    };
});