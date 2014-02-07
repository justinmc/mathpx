/*
    Scene: Play: PlayAddNeg
    Main game, addition mode with negative answers possible
*/
/*global define */
define(['jquery', 'questions', 'play', 'victory'], function ($, Questions, Play, Victory) {
    'use strict';

    return (function() {
        Play.extend(PlayAddNeg);

        PlayAddNeg.prototype.name = 'PlayAddNeg';
        PlayAddNeg.prototype.route = 'challenges/addneg/play';

        PlayAddNeg.prototype.configLeft = 0;
        PlayAddNeg.prototype.configRight = 0;
        PlayAddNeg.prototype.configAnswer = 2;

        function PlayAddNeg(engine, questions, id) {
            // Create the reset function
            this.reset = function(engine, questions, id) {
                this.engine.scenes[this.name] = new PlayAddNeg(engine, questions, id);
                this.engine.changeScenes(this.name);
            }.bind(this, engine, questions, id);

            // If not given a set of questions, get them from localStorage
            if (typeof questions === 'undefined' || questions === null) {
                questions = new Questions('questionsAdditionNeg');
                questions.fetch();
            }

            PlayAddNeg.__super__.constructor.call(this, engine, questions, id);
        }

        PlayAddNeg.prototype.render = function(ctx, dt) {
            PlayAddNeg.__super__.render.call(this, ctx, dt);
        };

        PlayAddNeg.prototype.setupNumBar = function(numL, numR) {
            PlayAddNeg.__super__.setupNumBar.call(this, this.getQuestion().get('numL'), this.getQuestion().get('numR'));
        };

        PlayAddNeg.prototype.setupAnswer = function(answer) {
            PlayAddNeg.__super__.setupAnswer.call(this, '?');
        };

        // Reset the current scene
        PlayAddNeg.prototype.reset = function() {
            this.engine.scenes[this.name] = new PlayAddNeg(this.engine);
            this.engine.changeScenes(this.name);
        };

        // Menu button click event
        PlayAddNeg.prototype.clickMenu = function() {
            return function(event) {
                this.engine.changeScenes('MenuChallengesQuestionsAddNeg', require('menuChallengesQuestionsAddNeg'));
            }.bind(this);
        };

        // Next button click event
        PlayAddNeg.prototype.clickNext = function() {
            var me = this;
            return function(event) {
                var nextId = me.getQuestionIdNext();

                // If no next question
                if (nextId === null) {
                    // If all questions complete, go to victory
                    if (me.questions === null || me.questions.complete()) {
                        me.engine.scenes.Victory = new Victory(me.engine, 'Addition with Negatives');
                        me.engine.changeScenes('Victory');
                    }
                    // Otherwise go back to the menu
                    else {
                        me.engine.changeScenes('MenuChallengesQuestionsAddNeg', require('menuChallengesQuestionsAddNeg'));
                    }

                }
                // Otherwise go to the next question in the set
                else {
                    me.engine.scenes[me.name] = new PlayAddNeg(me.engine, me.questions, me.getQuestionIdNext());
                    me.engine.changeScenes(me.name);
                }
            };
        };

        return PlayAddNeg;

    })();
});
