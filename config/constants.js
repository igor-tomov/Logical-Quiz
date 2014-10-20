(function(){
    var constants = {
        DEFAULT_LOCALE: "en",
        PRIMARY_LOCALE: "all",
        CATEGORY_DEFAULT_THUMBNAIL: '/public/img/categories/default.png',
        QUIZ_ASSET_COUNT: 10
    };

    if ( typeof module === "object" && module.exports ){
        module.exports = constants;
    }else if ( typeof define === "function" ){
        define( "constants", [], constants );
    }else{
        this.constants = constants;
    }
})();