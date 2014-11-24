(function(){
    var constants = {
        DEFAULT_LOCALE: "en",
        LOCALE_COOKIE_NAME: "locale",
        LOCALE_EXTENSION: ".json",
        PRIMARY_LOCALE: "all",
        CATEGORY_DEFAULT_THUMBNAIL: '/img/categories/default.jpg',
        QUIZ_ASSET_COUNT: 10,

        // Events
        FRONT_RETURN_EVENT: "front:return",
        GAME_LAUNCH_EVENT: "game:launch",
        GAME_START_EVENT: "game:start",
        QUIZ_SUBJECT_EVENT: "quiz:subject"
    };

    if ( typeof module === "object" && module.exports ){
        module.exports = constants;
    }else if ( typeof define === "function" ){
        define( "constants", [], constants );
    }else{
        this.constants = constants;
    }
})();