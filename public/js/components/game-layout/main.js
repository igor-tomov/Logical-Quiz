/**
 * Manages game workflow
 */
define( [ "./model" ], function( Model ){
    return {
        type: "layout",

        options: {
            //openTriggerEvent: "game:launch",

            open: {
                animate: {
                    enable: false
                }
            },

            close: {
                animate: {
                    enable: false
                }
            }
        },

        model: new Model,

        initialize: function(){
            var sandbox = this.sandbox;

            // init game trigger
            sandbox.on( "game:launch", this.onLaunch, this );
            sandbox.on( "game:item:next", this.onNextItem, this );
            sandbox.on( "game:close", this.close, this );

            // bind event handlers to loading model
            this.model.on( "sync", this.onLoad, this )
                      .on( "error", this.onLoadErrorHandler, this );
        },

        onLaunch: function(){
            this.model.fetch({ reset: true });
        },

        onLoad: function( model ){
            this.start( model );
        },

        onLoadErrorHandler: function( model, reason ){
            throw new Error( "Game Layout: Loading Game data has failed" ); // todo:implement some UI representation
        },

        onNextItem: function(){
            this.next();
        },

        start: function( model ){
            var sandbox = this.sandbox;

            if ( model.length === 0 ){
                throw new Error( "Game array is empty" );
            }

            this.open()
                .then( function(){
                    sandbox.emit( "game:load", model );
                    sandbox.emit( "game:item:current", model.current() );
                });
        },

        next: function(){
            var itemModel = this.model.next();

            if ( itemModel ){
                this.sandbox.emit( "game:item:current", itemModel );
            }else{
                this.sandbox.emit( "game:finish", this.model );
            }
        }
}});