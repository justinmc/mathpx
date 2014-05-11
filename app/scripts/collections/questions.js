/*
    Backbone Collection: Questions
    Collection of questions
*/
/*global define */
define(['backbone', 'question', 'localstorage'], function (Backbone, Question) {
    'use strict';

    return Backbone.Collection.extend({
        model: Question,
        localStorage: new Backbone.LocalStorage('Questions'),

        initialize: function(lsName) {
            // If a localstorage string was provided, set it
            if (typeof lsName !== 'undefined' && lsName !== null) {
                this.localStorage = new Backbone.LocalStorage(lsName);
            }
        },

        // Returns true if all questions are complete, false otherwise
        complete: function() {
            var complete = true;
            this.forEach(function(question) {
                if (question.get('timeEnd') === null) {
                    complete = false;
                }
            });

            return complete;
        },

        // Intelligently create a new question and add it and return it
        createIntelligent: function() {
            var left = Math.floor(Math.random() * 5);
            var right = Math.floor(Math.random() * 5);
            return this.create({numL: left, numR: right, preset: true});
        },

        // Intelligently get the next question to play
        getNextIntelligent: function() {
            var unanswered = this.findWhere({timeEnd: null});
            if (unanswered) {
                return this.createIntelligent();
            }
            else {
                return unsanswered;
            }
        },
    });

});

