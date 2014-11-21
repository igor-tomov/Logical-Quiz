/**
 * React mixin provides animation feature with Animate.css
 */
define(function(){

    // Constants
    var NOOP            = function(){},
        ANIMATE_CLASS   = "animated",
        ANIMATION       = "animation webkitAnimation oAnimation MSAnimation",
        ANIMATION_START = "animationstart webkitAnimationStart oanimationstart MSAnimationStart",
        ANIMATION_ITER  = "animationiteration webkitAnimationIteration oanimationiteration	MSAnimationIteration",
        ANIMATION_END   = "animationend webkitAnimationEnd oanimationend MSAnimationEnd";

    var DOMstyles   = this.document.documentElement.style,
        animations  = ANIMATION.split( " " ),
        animationStart, animationIter, animationEnd, i;

    // determine vendor
    for ( i = 0; i < animations.length; i++ ){
        if ( DOMstyles[ animations[i] ] !== undefined ){
            animationStart  = ANIMATION_START.split( " " )[i];
            animationIter   = ANIMATION_ITER.split( " " )[i];
            animationEnd    = ANIMATION_END.split( " " )[i];

            break;
        }
    }

    if ( ! animationStart && typeof console === "object" ){
        console.warn( "Current browser doesn't support CSS Animation" );
    }

    // AnimateCSS Mixin
    return {
        componentDidMount: function(){
            var node         = this.getDOMNode(),
                animateEnter = this.state.animateEnter;

            node.addEventListener( animationStart, this.onAnimationStart, false );
            node.addEventListener( animationIter, this.onAnimationIter, false );
            node.addEventListener( animationEnd, this.onAnimationEnd, false );
            node.addEventListener( animationEnd, this._clearAnimation, false );

            if ( animateEnter ){
                this.triggerAnimation( animateEnter );
            }
        },

        componentWillUnmount: function(){
            var node = this.getDOMNode();

            node.removeEventListener( animationStart, this.onAnimationStart );
            node.removeEventListener( animationIter, this.onAnimationIter );
            node.removeEventListener( animationEnd, this.onAnimationEnd );
            node.removeEventListener( animationEnd, this._clearAnimation );
        },

        triggerAnimation: function( animateClass ){
            var classes    = ( this.state.className || "" ).trim().split( /\s+/ ),
                isAnimated = classes.indexOf( ANIMATE_CLASS );

            if ( isAnimated !== -1 ){
                classes.splice( isAnimated, 2 );
            }

            classes.push( ANIMATE_CLASS, animateClass );

            this.setState({
                className: classes.join( " " )
            })
        },

        /**
         * Remove animation-specific classes and update component state
         */
        _clearAnimation: function() {
            var classes    = ( this.state.className || "" ).trim().split(/\s+/),
                isAnimated = classes.indexOf( ANIMATE_CLASS );

            if ( isAnimated !== -1 ){
                classes.splice( isAnimated, 2 );

                this.setState({
                    className: classes.join(" ")
                })
            }
        }
    }
});