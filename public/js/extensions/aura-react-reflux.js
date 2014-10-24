/**
 * Extension init & integrate "ReactJS" and "Reflux" to Aura environment
 */

require.config({
    paths: {
        react: "bower_components/react/react",
        reflux: "bower_components/reflux/dist/reflux"
    },

    shim: {
        react: { exports: "React" }
    }
});

define( [ "underscore", "react" ], function( _, React ){
    return function( app ){
        var basePrototype = app.core.Components.Base.prototype;

        if ( this.document && "ontouchstart" in this.document ){
            // initialize touch events
            React.initializeTouchEvents( true );
        }

        /**
         * show Aura component
         */
        basePrototype.show = function(){
            this.$el[0].classList.remove( "hide" );
        };

        /**
         * Hide Aura component and remove inner React components
         */
        basePrototype.hide = function(){
            this.removeComponent();
            this.$el[0].classList.add( "hide" );
        };

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

        /**
         * Remove React component from from current Aura component's element
         */
        basePrototype.removeComponent = function(){
            React.unmountComponentAtNode( this.$el[0] );
        };
    }
});