/**
 * Component manages front layout of application
 */
define( [ "underscore" ], function( _ ){

    return {
        type: "layout",

        options: {
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

        initialize: function( opts ){
            this.constructor.__super__.constructor.__super__.initialize.call( this, opts );
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
                        sandbox.emit( "game:start" );
                    });
            }
        }
    }
});