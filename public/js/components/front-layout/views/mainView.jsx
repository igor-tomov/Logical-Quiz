/** @jsx React.DOM */
define( [ "react", "../actions/mainActions" ], function( React, Actions ){
    return React.createClass({

        _onStart: function(){
            Actions.startGame();
        },

        render: function(){
            var locale = this.props.locale;

            return (
                <div className="front-inner">
                    <div className="container">
                        <div className="row">
                            <div className="front-content">
                                <h1>{locale.mainTitle}</h1>
                                <h2>{locale.subTitle}</h2>
                                <p className="lead">{locale.desc}</p>
                                <p classNameName="lead">
                                    <a className="btn btn-lg btn-default" onClick={this._onStart}>{locale.startBtn}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});