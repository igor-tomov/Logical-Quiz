/** @jsx React.DOM */
define( [ "react" ], function( React ){
    return React.createClass({

        _onStart: function(){
            console.log( "Get started: ", this );
        },

        render: function(){
            return (
                <section data-aura-component="front-layout" className="scene front-layout">
                    <div className="front-inner">
                        <div className="container">
                            <div className="row">
                                <div className="front-content">
                                    <h1>Logical quiz</h1>
                                    <h2>Welcome to awesome logical quiz</h2>
                                    <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                                    <p classNameName="lead">
                                        <a className="btn btn-lg btn-default" onClick="{this._onStart}">Get started</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    });
});