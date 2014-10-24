/**
 * Game scene manages workflow throughout game process
 */
define( [ "constants" ], function( constants ){
    'use strict';
    return {
        options: {
            children: {
                categories: "quiz-categories",
                board: "quiz-board"
            }
        },

        initialize: function(){
            var sandbox = this.sandbox;

            sandbox.on( constants.GAME_LAUNCH_EVENT, this.open, this );
        },

        open: function(){
            this.show();
            this.openQuizCategories();
        },

        close: function(){
            this.hide();
            this.sandbox.emit( constants.FRONT_RETURN_EVENT );
        },

        openQuizCategories: function(){
            var childName = this.options.children.categories;

            this.sandbox.start({
                name: childName,
                options: {
                    el: "#" + childName
                }
            });
        },

        openQuizBoard: function(){
            //todo
        },

        openQuizResult: function(){
            //todo
        }
}});