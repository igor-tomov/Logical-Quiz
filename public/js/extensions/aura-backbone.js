define({
        require: {
            paths: {
                backbone:   'bower_components/backbone/backbone'
            }
        },

        initialize: function(app) {
            var Backbone = require('backbone'),
                Views    = {};

            app.core.mvc = Backbone;

            // Injecting a Backbone view in the Component just before initialization.
            // This View's class will be built and cached this first time the component is included.
            app.components.before('initialize', function(options) {
                var View = Views[options.ref];

                if (!View) {
                    Views[options.ref] = View = Backbone.View.extend( this.View );
                }

                this.view = new View({ el: this.$el });
                this.view.sandbox = this.sandbox;
                this.view.component = this;
            });

            app.components.before('remove', function() {
                this.view && this.view.stopListening();
            });
        }
});