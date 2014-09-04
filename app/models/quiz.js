var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Represents single quiz structure
 *
 * @type {Schema}
 */
var QuizScheme = new Schema({
    cases: {
        type: Array,
        required: true
    },
    target: {
        type: Number,
        required: true
    }
});

mongoose.model( "Quiz", QuizScheme );