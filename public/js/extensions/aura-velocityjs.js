/**
 * Extend Base component prototype with animation features via Velocity.js (http://velocityjs.org)
 */

requirejs.config({
    paths: {
        velocity_js: "bower_components/velocity/jquery.velocity",
        velocity_ui: "bower_components/velocity/velocity.ui"
    },

    shim: {
        velocity_ui: {
            deps: ["velocity_js"]
        }
    }
});

define(
    [
        "jquery",
        "velocity_ui"
    ],

    function( $ ){
        return {
            initialize: function( app ){
                var velocity  = $.fn.velocity,
                    slice     = Array.prototype.slice;

                // add to Component prototype
                app.core.Components.Base.prototype.animate = function(){
                    return velocity.apply( this.$el, arguments ).promise();
                }

                // add to sandbox
                app.sandbox.dom.animate = function( target ){
                    var args = slice.call( arguments, 1 );

                    if ( ! ( target instanceof $ ) ){
                        target = $( target );
                    }

                    return velocity.apply( target, args ).promise();
                }
            }
        }
    }
);