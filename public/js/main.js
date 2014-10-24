require.config({
    baseUrl: "",

    paths: {
        underscore: 'bower_components/underscore/underscore',
        jquery:     'bower_components/jquery/jquery',
        ext:        'js/extensions',
        utils:      'js/utils',
        constants:  'js/constants',
        tpl:        'templates/components'
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