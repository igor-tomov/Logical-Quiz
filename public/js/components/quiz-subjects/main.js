/**
 * Represents "Quiz subject"
 */
define( [ "./views/subjectsView" ], function( view ){
    'use strict';
    return {
        initialize: function(){
            var subjectItem = { id: "24a34cd343fa223", title: "Sample item", thumbnail: "/img/categories/default.jpg" },
                subjects    = [],
                i;

            for ( i = 0; i < 5; i++ ){
                subjects.push( subjectItem );
            }

            this.renderComponent( view, { items: subjects } );
        }
}});