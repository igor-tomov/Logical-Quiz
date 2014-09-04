/**
 * Represents board, which is contain cases of current game item
 */
define( [ "underscore" ], function( _ ){
    return {

        options: {
            openDelay: 1000,
            caseIndexAttr: "data-case-index"
        },

        templates: ["cases-list"],

        initialize: function(){
            var sandbox = this.sandbox;

            // bind events listeners
            sandbox.on( "game:item:current", this.onReceiveItem, this );
            sandbox.on( "game:timeout", this.onTimeout, this );
            sandbox.on( "game:finish", this.onFinish, this );
        },

        onReceiveItem: function( model ){
            var self = this;

            this.$el.removeClass( "hide" );
            this.curModel = model;

            setTimeout( function(){
                self.render();
                self.show()
                    .then(function(){
                        self.sandbox.emit( "game:start" );
                    });
            }, this.options.openDelay );
        },

        onTimeout: function(){
            this.$el.off( "click", this.onChooseCase );
            this.hide();
        },

        onFinish: function(){
          this.reset();
        },

        onChooseCase: function( event ){
            var component = event.data.component,
                attr      = component.options.caseIndexAttr,
                index     = +this.getAttribute( attr ),
                promise;

            if ( isNaN( index ) ){
                throw new Error( "Unrecognized value of '" + attr + "' attribute: " + index );
            }

            if ( component.passCase( index ) ){
                promise = component.markSuccess( this );
            }else{
                promise = component.markFail( this );
            }

            promise.then(function(){
                component.hide();
            });
        },

        show: function(){
            return this.animate( "transition.expandIn" );
        },

        hide: function(){
            var self    = this,
                promise = this.animate( "transition.expandOut", { display: "block" } );

            promise.then(function(){
                self.sandbox.emit( "game:item:next" );
            });

            return promise;
        },

        render: function(){
            this.html( this.renderTemplate( "cases-list", { cases_list: this.curModel.getCases() } ) );
            this.$el.one( "click", "[" + this.options.caseIndexAttr +"]", { component: this }, this.onChooseCase );
        },

        passCase: function( index ){
            if ( ! this.curModel ){
                throw new Error( "Game board: current model is not found" );
            }

            var result = this.curModel.pass( index );

            this.sandbox.emit( "game:case:choose", result );

            return result;
        },

        markSuccess: function( element ){
            element.className += " success";
            return this.sandbox.dom.animate( element, "callout.pulse" );
        },

        markFail: function( element ){
            element.className += " fail";
            return this.sandbox.dom.animate( element, "callout.shake" );
        },

        reset: function(){
            var self = this;

            delete this.curModel;

            setTimeout( function(){
                self.$el
                    .addClass( "hide" )
                    .empty();
            }, 500 );
        }
}});