define( ["underscore"], function( _ ){

    /**
     * Default options for Layout component
     */
    var defaults = {
        openTriggerEvent: null,

        open: {
            emitEvent: "layout:open",

            animate: {
                enable: true,
                easing: "fadeIn",
                duration: 400
            }
        },

        close: {
            emitEvent: "layout:close",

            animate: {
                enable: true,
                easing: "fadeOut",
                duration: 400
            }
        }
    };

    /**
     * Deep copying of "src" object's properties over to "dest" object
     *
     * @param {Object} dest
     * @param {Object} src
     * @returns {*}
     */
    function deepExtend( dest, src ){
        var prop;

        if ( ! _.isObject( src ) || ! _.isObject( dest ) ){
            return dest;
        }

        for ( prop in src ){
            if ( _.has( src, prop ) ){
                if ( _.isObject( src[prop] ) ){
                    if ( ! _.isObject( dest[prop] ) ){
                        dest[prop] = {};
                    }

                    deepExtend( dest[prop], src[prop] );
                }else if ( dest[prop] === undefined ){
                    dest[prop] = src[prop];
                }
            }
        }

        return dest;
    }

    /**
     * Layout prototype
     */
    var Layout = {
        open: function(){
            var opts        = this.options.open,
                animateOpts = opts.animate,
                sandbox     = this.sandbox;

            // emit "Open layout" event
            this.sandbox.emit( opts.emitEvent );

            // show target element
            this.$el.removeClass( "hide" );

            return sandbox.data
                          .when( animateOpts.enable ? this.animate( animateOpts.easing, animateOpts.duration ) : true );
        },

        close: function( silent ){
            var self        = this,
                opts        = this.options.close,
                sandbox     = this.sandbox,
                animateOpts = opts.animate;

            return sandbox.data
                          .when( animateOpts.enable ? this.animate( animateOpts.easing, animateOpts.duration ) : true )
                          .then( function(){
                               self.$el.addClass( "hide" );

                               if ( ! silent ){
                                   sandbox.emit( opts.emitEvent );
                               }
                          });
        }
    };

    return {
        initialize: function( app ){
            app.components.addType( "layout", Layout );

            app.components.before( 'initialize', function( opts ){
                if ( this.type !== "layout" ){
                    return;
                }

                // merge current options with default layout options
                deepExtend( opts, defaults );

                //  bind "open" trigger on specific event
                if ( opts.openTriggerEvent ){
                    this.sandbox.on( opts.openTriggerEvent, _.bind( this.open , this ) );
                }
            });
        }
    }
});