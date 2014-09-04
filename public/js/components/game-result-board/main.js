/**
 * Component manages UI board which is show total result of passed game
 */
define( [ "underscore" ], function( _ ){
    "use strict";

    /**
     *
     *
     * @param {Array} rules
     * @constructor
     */
    function GameGrade( rules ){
        this.feed( rules );
    }

    GameGrade.prototype = {
        constructor: GameGrade,

        feed: function( rules ){
            this._rules = _.isArray( rules ) ? rules : [];
        },

        compute: function( value, total ){
            var perPoint = 100 / total,
                point    = Number( ( value * perPoint / 100 ).toFixed( 1 ) ),
                rules    = this._rules,
                range, i, length, assert;

            for ( i = 0, length = rules.length; i < length; i++ ){
                range  = rules[i].range;
                assert = _.isArray( range ) ?
                            point >= range[0] && point <= range[1] :
                            point === range;

                if ( assert ){
                    return rules[i];
                }
            }

            return null;
        }
    };

    return {

        templates: [ "index" ],

        options: {
            openDelay: 500,

            rules: [
                {
                    range: 0,
                    message: "You are absolutely loser",
                    classes: {
                        wrapper: "alert-danger",
                        btn: "btn-danger"
                    }
                },
                {
                    range: [0.1, 0.6],
                    message: "No bad, but you can better",
                    classes: {
                        wrapper: "alert-warning",
                        btn: "btn-warning"
                    }
                },
                {
                    range: [0.7, 0.9],
                    message: "Good, you go in right direction",
                    classes: {
                        wrapper: "alert-info",
                        btn: "btn-info"
                    }
                },
                {
                    range: 1,
                    message: "Excellent, you are genius",
                    classes: {
                        wrapper: "alert-success",
                        btn: "btn-success"
                    }
                }
            ]
        },

        initialize: function(){
            this.sandbox.on( "game:finish", this.onFinish, this );
        },

        onFinish: function( model ){
            var grade  = new GameGrade( this.options.rules ),
                passed = model.passedCount(),
                total  = model.length,
                rule   = grade.compute( passed, total ),
                data;

            if ( rule ){
                data = _.extend( {}, rule, { passed: passed, total: total } );

                this.render( data );
                this.show();
            }
        },

        render: function( data ){
            this.html( this.renderTemplate( "index", data ) );
        },

        show: function(){
            var self = this;

            setTimeout( function(){
                self.$el.removeClass( "hide" );
                self.animate( "transition.slideDownBigIn" );
            }, this.options.openDelay );
        },

        hide: function(){
            var $element = this.$el,
                promise  = this.animate( "transition.slideDownBigOut" );

            promise.then(function(){
                $element.addClass( "hide" );
            });

            return promise;
        },

        View: {
            events: {
                "click #btn-front-return": function(){
                    var component = this.component;

                    component.hide()
                             .then(function(){
                                 component.sandbox.emit( "game:close" );
                                 component.sandbox.emit( "front:return" );
                             });
                }
            }
        }
}});