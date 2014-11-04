require.config({
    baseUrl: "",

    paths: {
        underscore: 'bower_components/underscore/underscore',
        jquery:     'bower_components/jquery/jquery',
        backbone:   'bower_components/backbone/backbone',
        ext:        'js/extensions',
        constants:  'js/constants',
        utils:      'js/utils'
    },

    shim: {
        backbone: {
            exports: 'Backbone',
            deps: ['underscore', 'jquery']
        }
    }
});

require( ["bower_components/aura/lib/aura"], function( Aura ){

    // define app with config
    var app = Aura({
            debug: true,
            sources: {
                default: "/js/components"
            }
        });

    // include extensions
    app.use( "ext/aura-locale" )
       .use( "ext/aura-react-reflux" );

    // start app
    app.start();
});