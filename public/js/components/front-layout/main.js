/**
 * Component manages front layout of application
 */
define( [ "underscore", "./actions/main" ], function( _, Actions ){

    return {
        type: "layout",

        initialize: function(){
            //this.open();

            Actions.startGame.listen( this._onStartGame, this );

            this.sandbox.emit( "layout:open" );
            this.$el
                .removeClass( "hide" )
                .animate( "transition.slideLeftIn", { duration: 400, display: "table" } )
        },

        _onStartGame: function(){
            var sandbox = this.sandbox;

            this.close()
                .then( function(){
                    sandbox.emit( "game:launch" );
                });
        }
    }
});