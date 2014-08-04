/**
 * Show loading view while routing in progress
 */
define( ["underscore"], function( _ ){

    return {
        initialize: function(){
            this.sandbox.on( "layout:close", _.bind( this.show,  this ) );
            this.sandbox.on( "layout:open", _.bind( this.hide,  this ) );
        },

        show: function(){
            this.$el.removeClass( 'hide' );
        },

        hide: function(){
            this.$el.addClass( 'hide' );
        }
    }
});