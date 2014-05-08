/*
    Scene: Play: PlaySubNeg
    Main game, subtraction mode with negative answers possible
*/
/*global define */
define(['jquery', 'questions', 'play'], function ($, Questions, Play) {
    'use strict';

    return (function() {
        Play.extend(PlaySubNeg);

        PlaySubNeg.prototype.name = 'PlaySubNeg';
        PlaySubNeg.prototype.route = 'challenges/subneg/play';

        PlaySubNeg.prototype.configLeft = 0;
        PlaySubNeg.prototype.configRight = 0;
        PlaySubNeg.prototype.configAnswer = 2;

        function PlaySubNeg(engine, questions, id) {
            // Create the reset function
            this.reset = function(engine, questions, id) {
                this.engine.scenes[this.name] = new PlaySubNeg(engine, questions, id);
                this.engine.changeScenes(this.name);
            }.bind(this, engine, questions, id);

            // If not given a set of questions, get them from localStorage
            if (typeof questions === 'undefined' || questions === null) {
                questions = new Questions('questionsSubtractionNeg');
                questions.fetch();
            }

            PlaySubNeg.__super__.constructor.call(this, engine, questions, id);
        }

        PlaySubNeg.prototype.render = function(ctx, dt) {
            PlaySubNeg.__super__.render.call(this, ctx, dt);
        };

        PlaySubNeg.prototype.setupNumBar = function(numL, numR) {
            PlaySubNeg.__super__.setupNumBar.call(this, this.getQuestion().get('numL'), this.getQuestion().get('numR'));
        };

        PlaySubNeg.prototype.setupAnswer = function(answer) {
            PlaySubNeg.__super__.setupAnswer.call(this, '?');
        };

        // Reset the current scene
        PlaySubNeg.prototype.reset = function() {
            this.engine.scenes[this.name] = new PlaySubNeg(this.engine);
            this.engine.changeScenes(this.name);
        };

        // Menu button click event
        PlaySubNeg.prototype.clickMenu = function() {
            this.engine.changeScenes('MenuChallengesQuestionsSubNeg', require('menuChallengesQuestionsSubNeg'));
        };

        // Next button click event
        PlaySubNeg.prototype.clickNext = function() {
            var nextId = this.getQuestionIdNext();

            // If no next question
            if (nextId === null) {
                // If all questions complete, go to victory
                if (this.questions === null || this.questions.complete()) {
                    this.engine.changeScenes('VictorySubNeg', require('victorySubNeg'));
                }
                // Otherwise go back to the menu
                else {
                    this.engine.changeScenes('MenuChallengesQuestionsSubNeg', require('menuChallengesQuestionsSubNeg'));
                }

            }
            // Otherwise go to the next question in the set
            else {
                this.engine.scenes[this.name] = new PlaySubNeg(this.engine, this.questions, this.getQuestionIdNext());
                this.engine.changeScenes(this.name);
            }
        };

        return PlaySubNeg;

    })();
});
