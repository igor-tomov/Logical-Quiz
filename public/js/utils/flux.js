define( [ "underscore", "bower_components/flux/dist/Flux" ], function( _, Flux ){

    var dispatcherProto    = Flux.Dispatcher.prototype,
        AURA_ACTION_SOURCE = "AURA_ACTION",
        VIEW_ACTION_SOURCE = "VIEW_ACTION";



    function ExtDispatcher(){

        if ( ! ( this instanceof ExtDispatcher ) ){
            return new ExtDispatcher();
        }

        Flux.Dispatcher.call( this );
    }

    _.extend( ExtDispatcher.prototype, dispatcherProto, {

        dispatchAuraAction: function( action ) {
            this.dispatch({
                source: AURA_ACTION_SOURCE,
                action: action
            });
        },

        dispatchViewAction: function( action ) {
            this.dispatch({
                source: VIEW_ACTION_SOURCE,
                action: action
            });
        }
    });

    return {
        require: {
            paths: {
                flux: "utils/flux"
            }
        },

        AURA_ACTION_SOURCE: AURA_ACTION_SOURCE,
        VIEW_ACTION_SOURCE: VIEW_ACTION_SOURCE,

        Dispatcher: ExtDispatcher
    }
});