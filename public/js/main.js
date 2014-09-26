require.config({
    baseUrl: "",

    paths: {
        underscore: 'bower_components/underscore/underscore',
        jquery:     'bower_components/jquery/jquery',
        utils:      'js/utils',
        ext:        'js/extensions',
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
    app.use( "ext/aura-backbone" )
       .use( "ext/aura-templates" )
       .use( "ext/aura-velocityjs" )
       .use( "ext/layout-component" )
       .use( "ext/aura-flux" );

    // start app
    app.start();
});