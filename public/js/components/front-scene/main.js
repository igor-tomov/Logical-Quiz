/**
 * Component manages front layout of application
 */
define( [ "constants", "./actions/mainActions", "./views/mainView" ], function( constants, Actions, view ){

    return {
        initialize: function(){
            this.sandbox.on( constants.FRONT_RETURN_EVENT, this.open, this );
            Actions.startGame.listen( this._onStartGame, this );

            this.open();
        },

        open: function(){
            this.renderComponent( view );
            this.show();
        },

        _onStartGame: function(){
            this.hide();
            this.sandbox.emit( constants.GAME_LAUNCH_EVENT );
        }
    }
});