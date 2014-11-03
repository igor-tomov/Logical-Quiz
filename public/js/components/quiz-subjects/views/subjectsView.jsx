    /** @jsx React.DOM */
define( [ "react", "../actions/subjectActions", "utils/react.animation" ], function ( React, Actions, CSSAnimate ){

    var SubjectItem = React.createClass({

        mixins: [CSSAnimate],

        getInitialState: function(){
            return {
                className: "subject-item",
                animateEnter: "fadeIn"
            };
        },

        _onClick: function( event ){
            var subjectId = event.target.dataset.subjectId;

            console.log( "Subject Id: ", subjectId );
        },

        render: function(){
            return (
                <div className={this.state.className}>
                    <div className="subject-thumbnail">
                        <img src={this.props.thumbnail} data-subject-id={this.props.id} onClick={this._onClick}/>
                    </div>
                    <h3 className="subject-title">{this.props.title}</h3>
                </div>
            );
        }
    });

    return React.createClass({
        render: function(){
            var locale = this.props.locale,
                items  = this.props.items.map(function( item ){
                    return (
                        <SubjectItem id={item.id} title={item.title} thumbnail={item.thumbnail} />
                    );
                });

            return (
                <div className="container">
                    <h1>{locale.subjectsTitle}</h1>
                    <div className="row">
                        {items}
                    </div>
                </div>
            );
        }
    });
});