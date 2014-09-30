/**
 * Extension init & integrate "ReactJS" and "Reflux" to Aura environment
 */

require.config({
    paths: {
        react: "bower_components/react/react-with-addons",
        reflux: "bower_components/reflux/dist/reflux"
    },

    shim: {
        react: { exports: "React" }
    }
});

define( [ "underscore", "react" ], function( _, React ){
    return function( app ){
        var basePrototype = app.core.Components.Base.prototype;

        // initialize touch events
        React.initializeTouchEvents( true );

        /**
         * Render React component to Aura component's element
         *
         * @param {Function} component - React component
         * @param {Object} [props] - input properties to appropriate component
         */
        basePrototype.renderComponent = function ( component, props ) {
            var _props = { locale: this.getLocale() };

            if ( _.isObject( props ) ){
                _.defaults( _props, props );
            }

            React.renderComponent( component( _props ), this.$el[0] );
        };
    }
});