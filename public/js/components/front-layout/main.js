/**
 * Component manages front layout of application
 */
define( [ "underscore", "./actions/main", "./views/main" ], function( _, Actions, view ){

    return {
        type: "layout",

        initialize: function(){
            Actions.startGame.listen( this._onStartGame, this );

            this.renderComponent( view );
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