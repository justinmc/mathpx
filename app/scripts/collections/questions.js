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
            }
            if (!signR) {
                signR = Math.round(Math.random());
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
            console.log(statuses);
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

            // If no problem areas, get a random question
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
                if (signL) {
                    if (model.get('numL') < 0) {
                        return false;
                    }
                }
                if (!signL) {
                    if (model.get('numL') > 0) {
                        return false;
                    }
                }
                if (signR) {
                    if (model.get('numR') < 0) {
                        return false;
                    }
                }
                if (!signR) {
                    if (model.get('numR') > 0) {
                        return false;
                    }
                }
                return true;
            });
        },

        // Returns true if this set has good results in addition, false otherwise
        getStatuses: function() {
            var score = {
                posPos: 0,
                posPosQ: 0,
                posNeg: 0,
                posNegQ: 0,
                negPos: 0,
                negPosQ: 0,
                negNeg: 0,
                negNegQ: 0
            };

            this.forEach(function(model) {
                if (model.get('numL') >= 0 && model.get('numR') >= 0) {
                    score.posPos = score.posPos + model.getScore();
                    score.posPosQ = score.posPosQ + model.getScore(true);
                }
                if (model.get('numL') >= 0 && model.get('numR') <= 0) {
                    score.posNeg = score.posNeg + model.getScore();
                    score.posNegQ = score.posNegQ + model.getScore(true);
                }
                if (model.get('numL') <= 0 && model.get('numR') >= 0) {
                    score.negPos = score.negPos + model.getScore();
                    score.negPosQ = score.negPosQ + model.getScore(true);
                }
                if (model.get('numL') <= 0 && model.get('numR') <= 0) {
                    score.negNeg = score.negNeg + model.getScore();
                    score.negNegQ = score.negNegQ + model.getScore(true);
                }
            });

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

