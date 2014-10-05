/**
 * Component manages front layout of application
 */
define( [ "constants", "./actions/mainActions", "./views/mainView" ], function( constants, Actions, view ){

    return {
        initialize: function(){
            this.sandbox.on( constants.FRONT_OPEN_EVENT, this.open, this );
            Actions.startGame.listen( this._onStartGame, this );

            this.open();
        },

        open: function(){
            this.$el.removeClass( "hide" );
            this.renderComponent( view );
        },

        _onStartGame: function(){
            this.$el.addClass( "hide" );
            this.removeComponent();

            this.sandbox.emit( constants.GAME_LAUNCH_EVENT );
        }
    }
});