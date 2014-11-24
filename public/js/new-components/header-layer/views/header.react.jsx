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
                                    <a href="#">Sign In</a>
                                </li>
                                <li className="active">
                                    <a href="#">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    });
});