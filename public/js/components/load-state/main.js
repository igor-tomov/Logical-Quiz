/**
 * Show loading view while routing in progress
 */
define( ["underscore"], function( _ ){

    return {
        options: {
            openDelay: 500
        },

        initialize: function(){
            this.sandbox.on( "layout:close", _.bind( this.show,  this ) );
            this.sandbox.on( "layout:open", _.bind( this.hide,  this ) );
        },

        show: function(){
            this.__timer__ = setTimeout( _.bind( function(){
                this.$el.removeClass( 'hide' );
                delete this.__timer__;
            }, this ), this.options.openDelay );
        },

        hide: function(){
            if ( this.__timer__ ){
                clearInterval( this.__timer__ );
                delete this.__timer__;
            }

            this.$el.addClass( 'hide' );
        }
    }
});