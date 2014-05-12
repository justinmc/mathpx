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
            // Check status on addition of positives
            console.log(this.getStatusAdd());

            // If an unanswered question exists, get that
            var unanswered = this.findWhere({timeEnd: null});
            if (unanswered) {
                return unanswered;
            }
            else {
                return this.createIntelligent();
            }
        },

        // Returns true if this set has good results in addition, false otherwise
        getStatusAdd: function() {
            var score = 0;
            this.forEach(function(model) {
                // If this is the correct type of problem
                if (model.get('numL') >= 0 && model.get('numR') >= 0) {
                    // If it was answered correctly, add 2
                    if (model.get('timeEnd')) {
                        score = score + 2;
                    }

                    // If it was failed at least once, subtract 1
                    if (model.get('fails')) {
                        score--;
                    }
                }
            });

            return score >= 6;
        }
    });

});

