/** @jsx React.DOM */
(function( component ){
    if ( typeof module === "object" && module.exports ){
        module.exports = component;
    }else if ( typeof define === "function" ){
        define( component );
    }
})(function(){
    "use strict";

    var React = require( "react" );

    return React.createClass({

        propTypes: {
            locale: React.PropTypes.object.isRequired
        },

        render: function(){
            var locale = this.props.locale;

            return (
                <div className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
                                <span className="icon-bar" /><span className="icon-bar" /><span className="icon-bar" />
                            </button>
                            <a href="#" className="navbar-brand">Logo</a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active">
                                    <a href="#">{locale.signIn}</a>
                                </li>
                                <li className="active">
                                    <a href="#">{locale.signUp}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    });
});