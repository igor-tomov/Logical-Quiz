/**
 * Represents "Quiz subject"
 */
define( [ "./actions/subjectActions", "./views/subjectsView" ], function( Actions, View ){
    'use strict';
    return {
        initialize: function(){
            // bind listeners to actions
            Actions.invalidSubjectData.listen( this.onError, this );

            // trigger load subjects
            Actions.loadSubjects();

            // render component view
            this.renderComponent( View );
        },

        onError: function( reason ){
            this.sandbox.emit( "app:error", reason );
        }
}});