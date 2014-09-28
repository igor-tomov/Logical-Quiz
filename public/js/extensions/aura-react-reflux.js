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

define( [ "react" ], function( React ){
    return function( app ){
        var basePrototype = app.core.Components.Base.prototype;

        // initialize touch events
        React.initializeTouchEvents( true );

        /**
         * Render React component to root Aura component's element
         *
         * @param {React} component
         */
        basePrototype.renderComponent = function (component) {
            React.renderComponent(component, this.$el[0]);
        };
    }
});