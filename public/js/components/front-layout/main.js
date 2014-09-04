/**
 * Component manages front layout of application
 */
define( [ "underscore" ], function( _ ){

    return {
        type: "layout",

        options: {
            openTriggerEvent: "front:return",

            open: {
                animate: {
                    easing: "transition.slideLeftIn"
                }
            },

            close: {
                animate: {
                    easing: "transition.slideRightOut"
                }
            }
        },

        initialize: function(){
            this.open();
        },

        View: {
            events: {
                "click #game-start": "start"
            },

            start: function( event ){
                var sandbox = this.sandbox;

                event.preventDefault();

                this.component
                    .close()
                    .then( function(){
                        sandbox.emit( "game:launch" );
                    });
            }
        }
    }
});