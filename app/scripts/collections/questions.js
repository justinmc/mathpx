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
        createRandom: function(signL, signR) {
            // Use random signs if none given
            if (!signL) {
                signL = Math.round(Math.random());
                if (!signL) {
                    signL = -1;
                }
            }
            if (!signR) {
                signR = Math.round(Math.random());
                if (!signR) {
                    signR = -1;
                }
            }

            var left = signL * Math.floor(Math.random() * 5);
            var right = signR * Math.floor(Math.random() * 5);
            return this.create({numL: left, numR: right, preset: true});
        },

        // Intelligently get the next question to play
        getNextIntelligent: function() {
            // If bad status on addition of positives, do one of those
            var statuses = this.getStatuses();

            // Get a question from the first problem area
            if (!statuses.posPos) {
                return this.createRandom(1, 1);
            }
            else if (!statuses.posPosQ) {
                return this.getNextIntelligentQuizType(1, 1);
            }
            else if (!statuses.posNeg) {
                return this.createRandom(1, -1);
            }
            else if (!statuses.posNegQ) {
                return this.getNextIntelligentQuizType(1, -1);
            }
            else if (!statuses.negPos) {
                return this.createRandom(-1, 1);
            }
            else if (!statuses.negPosQ) {
                return this.getNextIntelligentQuizType(-1, 1);
            }
            else if (!statuses.negNeg) {
                return this.createRandom(-1, -1);
            }
            else if (!statuses.negNegQ) {
                return this.getNextIntelligentQuizType(-1, -1);
            }

            // If no problem areas, check for unanswered quiz questions
            var unanswereds = this.getUnansweredQuizType();
            if (unanswereds.length) {
                return unanswereds[0];
            }

            // If nothing else, get a random new question
            return this.createRandom();
        },

        // Helper for getNextIntelligent to get a quiz question of the given type
        getNextIntelligentQuizType: function(signL, signR) {
            var unanswereds = this.getUnansweredQuizType(signL, signR);
            if (unanswereds.length) {
                return unanswereds[0];
            }
            else {
                return this.createRandom(signL, signR);
            }
        },

        // Return all questions with the given signs that are unanswered in quiz
        getUnansweredQuizType: function(signL, signR) {
            return this.filter(function(model) {
                if (model.get('timeEndQuiz')) {
                    return false;
                }
                if (signL === 1) {
                    if (model.get('numL') < 0) {
                        return false;
                    }
                }
                if (signL === -1) {
                    if (model.get('numL') > 0) {
                        return false;
                    }
                }
                if (signR === 1) {
                    if (model.get('numR') < 0) {
                        return false;
                    }
                }
                if (signR === -1) {
                    if (model.get('numR') > 0) {
                        return false;
                    }
                }
                return true;
            });
        },

        // Returns the player's score in each area
        getScores: function() {
            var score = {
                posPos: null,
                posPosQ: null,
                posNeg: null,
                posNegQ: null,
                negPos: null,
                negPosQ: null,
                negNeg: null,
                negNegQ: null
            };

            var me = this;
            this.forEach(function(model) {
                if (model.get('numL') >= 0 && model.get('numR') >= 0) {
                    score.posPos = me.updateScore(score.posPos, model.getScore());
                    score.posPosQ = me.updateScore(score.posPosQ, model.getScore(true));
                }
                if (model.get('numL') >= 0 && model.get('numR') <= 0 && model.get('numL') > model.get('numR') && model.get('numL') + model.get('numR') >= 0) {
                    score.posNeg = me.updateScore(score.posNeg, model.getScore());
                    score.posNegQ = me.updateScore(score.posNegQ, model.getScore(true));
                }
                if (model.get('numL') < 0 && model.get('numR') >= 0) {
                    score.negPos = me.updateScore(score.negPos, model.getScore());
                    score.negPosQ = me.updateScore(score.negPosQ, model.getScore(true));
                }
                if (model.get('numL') <= 0 && model.get('numR') <= 0 && !(model.get('numL') === 0 && model.get('numR') === 0)) {
                    score.negNeg = me.updateScore(score.negNeg, model.getScore());
                    score.negNegQ = me.updateScore(score.negNegQ, model.getScore(true));
                }
            });

            return score;
        },

        updateScore: function(score, scoreModel) {
            if (scoreModel !== null) {
                return score + scoreModel;
            }
            else {
                return score;
            }
        },

        // Returns object representing the player's competency in each area
        getStatuses: function() {
            var score = this.getScores();

            // Create statuses from scores
            var statuses = {};
            for (var key in score) {
                statuses[key] = this.evaluateScore(score[key]);
            }

            return statuses;
        },

        // Convert a score to a true/false pass/fail status
        evaluateScore: function(score) {
            return score > 6;
        }
    });

});

