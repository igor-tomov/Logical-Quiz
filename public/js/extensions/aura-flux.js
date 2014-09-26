requirejs.config({
    paths: {
        react: "bower_components/react/react-with-addons"
    }
});

define( [ "underscore", "jquery", "react" ], function( _, $, React ){
    return function( app ){
        var COMPONENT_FLUX_TYPE = 'flux';

        // initialize touch events
        React.initializeTouchEvents( true );

        app.components.addType( COMPONENT_FLUX_TYPE, {

            /**
             * Render React component to root Aura component's element
             *
             * @param {React} component
             */
            renderComponent: function (component) {
                React.renderComponent(component, this.$el[0]);
            },

            /**
             * Subscribe on supplied action type within current Flux environment
             *
             * @param {String} type
             * @param {Function} callback
             */
            onAction: function (type, callback) {

            },

            /**
             * Emit action with supplied type within current Flux environment
             * If data isn't plain object, then it will be replaced to {data: data}
             *
             * @param {String} type
             * @param {Mixed} data
             */
            emitAction: function (type, data) {
                var payload = { type: type };


                if ( data !== undefined ){
                    if ( typeof data === "object" && data.constructor === Object ){
                        _.defaults( payload, data );
                    }else{
                        payload.data = data;
                    }
                }

                this._dispatcher
                    .dispatchAuraAction( payload );
            }
        });

        app.components.before( "initialize", function(){

            if ( this.type !== COMPONENT_FLUX_TYPE ){
                return;
            }

            var self     = this,
                deferred = $.Deferred();

            require( [ app.config.sources.default + "/" + this.options.name + "/dispatcher.js" ], function( dispatcher ){
                // save reference to dispatcher instance
                self._dispatcher = dispatcher;

                deferred.resolve();
            });

            return deferred.promise();
        });
    }
});