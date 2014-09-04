/**
 * Represent game score board
 */
define(function(){
    return {
        options: {
            selectors: {
                current: "#score-current",
                total: "#score-total"
            }
        },

        initialize: function(){
            var sandbox   = this.sandbox,
                selectors = this.options.selectors;

            // find necessary DOM elements
            this.$current = this.$find( selectors.current );
            this.$total   = this.$find( selectors.total );

            // bind events listeners
            sandbox.on( "game:load", this.onLoad, this );
            sandbox.on( "game:case:choose", this.onChooseCase, this );
            sandbox.on( "game:finish", this.reset, this );
        },

        show: function(){
            this.$el.removeClass( "hide" );
            this.animate( "transition.slideRightIn" );
        },

        hide: function(){
            return this.animate( "transition.slideRightOut", 500 );
        },

        /**
         * Prepare score data according to supplied Model
         */
        onLoad: function( model ){
            var scores = {
                current: 0,
                total: model.length
            };

            this.$current.text( scores.current );
            this.$total.text( scores.total );

            this.scores = scores;

            this.show();
        },

        onChooseCase: function( passed ){
            this.update( passed )
        },

        update: function( passed ){
            if ( passed ){
                this.scores.current++;
                this.$current.text( this.scores.current );
            }
        },

        reset: function(){
            var self = this;

            this.hide()
                .then(function(){
                    self.$current.text( "" );
                    self.$total.text( "" );

                    delete self.scores;
                });
        }
}});