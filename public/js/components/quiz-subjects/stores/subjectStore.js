define( [ "backbone", "reflux", "../actions/subjectActions" ], function( Backbone, Reflux, Actions ){

    var subjects;

    return {
        clickable: Reflux.createStore({
            init: function(){
                this._status = true;

                this.listenTo( Actions.subjectChoose, this.onToggle );
            },

            onToggle: function(){
                this._status = ! this._status;
                this.trigger( this._status );
            },

            getStatus: function(){
                return this._status;
            }
        }),

        subjects: Reflux.createStore({
            listenables: Actions,

            init: function(){
                // init Subject collection
                subjects = new Backbone.Collection;

                subjects.url = "/quiz/subjects";
                subjects.on( "sync", this.onSubjectsReady, this )
                    .on( "error", this.onError, this );
            },

            onLoadSubjects: function(){
                subjects.fetch();
            },

            onError: function( c, reason ){
                this.trigger( reason );
            },

            onSubjectsReady: function( data ){
                this.trigger( data.toJSON() );
            },

            onSubjectChosen: function(){
                // destroy subject collection
                subjects.off();
                subjects.reset();
                subjects = null;
            }
        })
    }
});