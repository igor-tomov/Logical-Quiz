/**
 * Represents game timer
 */
define( [ "underscore", "backbone" ], function( _, Backbone ){

    /**
     * Represents timer mechanism
     *
     * @param {Number} timeout - time value in milliseconds
     * @constructor
     */
    function GameTimer( timeout ){
        this.timeout = timeout || 10;
    }

    GameTimer.prototype = {
        constructor: GameTimer,

        start: function(){
            this.__time__     = this.timeout;
            this.__interval__ = setInterval( _.bind( this._update, this ), 1000 );
        },
        stop: function(){
            if ( this.__interval__ ){
                clearInterval( this.__interval__ );
                delete this.__interval__;
            }

            delete this.__time__;
        },

        _update: function(){
            if ( --this.__time__ > 0 ){
                this.trigger( "change", this.__time__ );
            }else{
                this.stop();
                this.trigger( "timeout" );
            }
        }
    };

    // Mix GameTimer with Backbone.Events functionality
    _.extend( GameTimer.prototype, Backbone.Events );

    return {

        options: {
            timeout: 15, // seconds

            selectors:{
                label: "#time-label"
            }
        },

        initialize: function(){
            var sandbox = this.sandbox;

            // find necessary DOM elements
            this.$label = this.$find( this.options.selectors.label );

            // bind events listeners
            sandbox.on( "game:load", this.onLoad, this );
            sandbox.on( "game:start", this.onStart, this );
            sandbox.on( "game:case:choose", this.onStop, this );
            sandbox.on( "game:finish", this.reset, this );
        },

        onLoad: function(){
            // init timer
            this.timer = new GameTimer( this.options.timeout );

            this.timer
                .on( "change", this.onChange, this )
                .on( "timeout", this.onTimeout, this );

            this.$label.text( "0" );
            this.show();
        },

        onStart: function(){
            this.$label.text( this.options.timeout );
            this.timer.start();
        },

        onStop: function(){
            this.timer.stop();
        },

        onChange: function( value ){
            this.$label.text( value );
        },

        onTimeout: function(){
            this.$label.text( 0 );
            this.sandbox.emit( "game:timeout" );
        },

        show: function(){
            this.$el.removeClass( "hide" );
            this.animate( "transition.slideLeftIn" );
        },

        hide: function(){
            return this.animate( "transition.slideLeftOut", 500 );
        },

        reset: function(){
            var $label = this.$label;

            // destroy timer
            if ( this.timer ){
                this.timer.off();
                delete this.timer;
            }

            // hide timer element
            this.hide()
                .then(function(){
                    $label.text( "" ); // reset last timer value
                });
        }
}});