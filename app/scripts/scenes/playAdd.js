/*
    Scene: Play: PlayAdd
    Main game, addition mode
*/
/*global define */
define(['jquery', 'questions', 'play'], function ($, Questions, Play) {
    'use strict';

    return (function() {
        Play.extend(PlayAdd);

        PlayAdd.prototype.name = 'PlayAdd';
        PlayAdd.prototype.route = 'challenges/add/play';

        PlayAdd.prototype.configLeft = 0;
        PlayAdd.prototype.configRight = 0;
        PlayAdd.prototype.configAnswer = 1;

        function PlayAdd(engine, questions, id) {
            // Create the reset function
            this.reset = function(engine, questions, id) {
                this.engine.scenes[this.name] = new PlayAdd(engine, questions, id);
                this.engine.changeScenes(this.name);
            }.bind(this, engine, questions, id);

            // If not given a set of questions, get them from localStorage
            if (typeof questions === 'undefined' || questions === null) {
                questions = new Questions('questionsAddition');
                questions.fetch();
            }

            PlayAdd.__super__.constructor.call(this, engine, questions, id);
        }

        PlayAdd.prototype.render = function(ctx, dt) {
            PlayAdd.__super__.render.call(this, ctx, dt);
        };

        PlayAdd.prototype.setupNumBar = function(numL, numR) {
            PlayAdd.__super__.setupNumBar.call(this, this.getQuestion().get('numL'), this.getQuestion().get('numR'));
        };

        PlayAdd.prototype.setupAnswer = function(answer) {
            PlayAdd.__super__.setupAnswer.call(this, '?');
        };

        // Reset the current scene
        PlayAdd.prototype.reset = function() {
            this.engine.scenes[this.name] = new PlayAdd(this.engine);
            this.engine.changeScenes(this.name);
        };

        // Menu button click event
        PlayAdd.prototype.clickMenu = function() {
            this.engine.changeScenes('MenuChallengesQuestionsAdd', require('menuChallengesQuestionsAdd'));
        };

        // Next button click event
        PlayAdd.prototype.clickNext = function() {
            var nextId = this.getQuestionIdNext();

            // If no next question
            if (nextId === null) {
                // If all questions complete, go to victory
                if (this.questions === null || this.questions.complete()) {
                    this.engine.changeScenes('VictoryAdd', require('victoryAdd'));
                }
                // Otherwise go back to the menu
                else {
                    this.engine.changeScenes('MenuChallengesQuestionsAdd', require('menuChallengesQuestionsAdd'));
                }

            }
            // Otherwise go to the next question in the set
            else {
                this.engine.scenes[this.name] = new PlayAdd(this.engine, this.questions, this.getQuestionIdNext());
                this.engine.changeScenes(this.name);
            }
        };

        return PlayAdd;

    })();
});
