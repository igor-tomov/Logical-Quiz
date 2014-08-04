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
                    prototype = app.core.Components.Base.prototype;

                prototype.animate = function(){
                    return velocity.apply( this.$el, arguments ).promise();
                }
            }
        }
    }
);