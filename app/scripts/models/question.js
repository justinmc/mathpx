/*
    Backbone Model: Question
    A record of a problem attempted by the user
*/
/*global define */
define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            mode: null,
            numL: 0,
            numR: 0,
            timeStart: null,
            timeEnd: null,
            timeEndQuiz: null,
            fails: 0,
            failsQuiz: 0,
            preset: false,
        },

        initialize: function() {
        },

        start: function() {
            this.timeStart = new Date().getTime();
        },

        end: function(quiz) {
            var timeEnd = new Date().getTime();
            if (quiz) {
                this.set('timeEndQuiz', timeEnd);
            }
            else {
                this.set('timeEnd', timeEnd);
            }
        },

        fail: function(quiz) {
            if (quiz) {
                this.set('failsQuiz', this.get('failsQuiz') + 1);
            }
            else {
                this.set('fails', this.get('fails') + 1);
            }
        },

        getAnswer: function() {
            return parseInt(this.get('numL'), 10) + parseInt(this.get('numR'), 10);
        },

        // Return the score
        getScore: function(quiz) {
            var score = 0;

            // If it was answered correctly, add 2
            if (this.isEnded(quiz)) {
                score = score + 2;
            }

            // If it was failed, subtract 1 for 1 fail, or 2 for 2 or more fails
            if (this.getFails(quiz) >= 1) {
                score--;
            }
            if (this.getFails(quiz) >= 2) {
                score--;
            }

            // If it was never attempted, return null
            if (score === 0 && !this.isEnded(quiz) && this.getFails(quiz) === 0) {
                score = null;
            }

            return score;
        },

        // Returns true if ended, false otherwise
        isEnded: function(quiz) {
            if (quiz) {
                return !!this.get('timeEndQuiz');
            }
            else {
                return !!this.get('timeEnd');
            }
        },

        // Returns fails or failsQuiz
        getFails: function(quiz) {
            if (quiz) {
                return this.get('failsQuiz');
            }
            else {
                return this.get('fails');
            }
        }
    });

});
