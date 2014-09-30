/**
 * Component manages front layout of application
 */
define( [ "underscore", "./actions/mainActions", "./views/mainView" ], function( _, Actions, view ){

    return {
        initialize: function(){
            Actions.startGame.listen( this._onStartGame, this );

            this.renderComponent( view );
        },

        _onStartGame: function(){
            this.$el.addClass( "hide" );
            this.sandbox.emit( "game:launch" );
        }
    }
});