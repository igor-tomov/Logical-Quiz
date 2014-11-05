    /** @jsx React.DOM */
define([
        "react",
        "reflux",
        "utils/react.animation",
        "../actions/subjectActions",
        "../stores/subjectStore"
], function ( React, Reflux, CSSAnimate, Actions, Store ){

    var ANIMATION_TYPE = "pulse";

    var SubjectItem = React.createClass({

        mixins: [CSSAnimate],

        getInitialState: function(){
            return {
                className: "subject-item",
                animateEnter: "fadeIn"
            };
        },

        _onClick: function(){
            if ( this.props.clickable ){
                this.triggerAnimation( ANIMATION_TYPE );
                Actions.subjectChoose();
            }
        },

        onAnimationEnd: function( event ){
            if ( event.animationName === ANIMATION_TYPE ){
                Actions.subjectChosen( this.props );
            }
        },

        render: function(){
            var props = this.props;

            return (
                <div className={this.state.className}>
                    <div className="subject-thumbnail">
                        <img
                            src={props.thumbnail}
                            onClick={this._onClick}
                            data-subject-id={props.id}
                            data-subject-title={props.title}
                        />
                    </div>
                    <h3 className="subject-title">{props.title}</h3>
                </div>
            );
        }
    });

    return React.createClass({
        mixins: [Reflux.ListenerMixin],

        getDefaultProps: function(){
            return {
                clickable: Store.clickable.getStatus()
            }
        },

        onSubjectReady: function( subjects ){
            if ( ! Array.isArray( subjects ) || ! subjects.length ){
                Actions.invalidSubjectData();
                return;
            }

            this.setProps({
                items: subjects
            });
        },

        onClickableChange: function( status ){
            this.setProps({
                clickable: status
            });
        },

        componentDidMount: function(){
            this.listenTo( Store.subjects, this.onSubjectReady );
            this.listenTo( Store.clickable, this.onClickableChange );
        },

        render: function(){
            var title = "",
                props = this.props,
                items = props.items;

            if ( items && items.length ){
                items = items.map(function( item ){
                    return (
                        <SubjectItem
                            id={item._id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            clickable={props.clickable}
                        />
                    );
                });

                title = props.locale.subjectsTitle;
            }

            return (
                <div className="container">
                    <h1>{title}</h1>
                    <div className="row">
                        {items}
                    </div>
                </div>
            );
        }
    });
});