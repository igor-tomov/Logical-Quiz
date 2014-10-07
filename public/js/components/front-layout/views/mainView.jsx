/** @jsx React.DOM */
define( [ "react", "../actions/mainActions", "utils/react.animation" ], function( React, Actions, CSSAnimate ){
    console.log( CSSAnimate );

    var FrontContent = React.createClass({
        mixins: [ CSSAnimate ],

        getInitialState: function(){
            return {
                className: "front-content",
                animateEnter: "fadeInLeft"
            };
        },

        render: function(){
            var locale  = this.props.locale;

            return (
                <div className={this.state.className}>
                    <h1>{locale.mainTitle}</h1>
                    <h2>{locale.subTitle}</h2>
                    <p className="lead">{locale.desc}</p>
                    <p classNameName="lead">
                        <a className="btn btn-default" onClick={this._onStart}>{locale.startBtn}</a>
                    </p>
                </div>
            );
        },

        onAnimationEnd: function( event ){
            if ( event.animationName === "fadeOutRight" ){
                Actions.startGame();
            }
        },

        _onStart: function(){
            this.triggerAnimation( "fadeOutRight" );
        }
    });

    return React.createClass({

        propTypes: {
            locale: React.PropTypes.object.isRequired
        },

        render: function(){
            return (
                <div className="front-inner">
                    <div className="container">
                        <div className="row">
                            <FrontContent locale={this.props.locale} />
                        </div>
                    </div>
                </div>
            );
        }
    });
});