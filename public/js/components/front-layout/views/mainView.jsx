/** @jsx React.DOM */
define( [ "react", "../actions/mainActions" ], function( React, Actions ){
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var FrontContent = React.createClass({

        getInitialState: function(){
            return {
                classes: [ "front-content" ]
            };
        },

        componentDidMount: function(){
            var classes = this.state.classes.concat( [ "animated", "fadeInLeft" ] );

            this.setState({ classes: classes });
        },

        render: function(){
            var locale  = this.props.locale,
                classes = this.state.classes.join( " " );

            return (
                <div className={classes}>
                    <h1>{locale.mainTitle}</h1>
                    <h2>{locale.subTitle}</h2>
                    <p className="lead">{locale.desc}</p>
                    <p classNameName="lead">
                        <a className="btn btn-lg btn-default" onClick={this._onStart}>{locale.startBtn}</a>
                    </p>
                </div>
            );
        },

        _onStart: function(){
            Actions.startGame();
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