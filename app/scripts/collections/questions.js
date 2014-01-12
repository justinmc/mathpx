/*
    Backbone Collection: Questions
    Collection of questions
*/
/*global define */
define(["backbone", "question", "localstorage"], function (Backbone, Question) {
    "use strict";

    return Backbone.Collection.extend({
        model: Question,
        localStorage: new Backbone.LocalStorage("Questions"),

        // Returns true if all questions are complete, false otherwise
        complete: function() {
            var complete = true;
            this.forEach(function(question) {
                if (question.get('timeEnd') === null) {
                   complete = false;
                }
            });

            return complete;
        }
    });

});

