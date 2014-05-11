/*
    Scene: Play: PlayQuiz
    Main game, quiz mode for manual entry
*/
/*global define */
define(['jquery', 'questions', 'play'], function ($, Questions, Play) {
    'use strict';

    return (function() {
        Play.extend(PlayQuiz);

        PlayQuiz.prototype.name = 'PlayQuiz';
        PlayQuiz.prototype.route = 'quiz';

        PlayQuiz.prototype.SceneBack = null;

        PlayQuiz.prototype.quiz = true;

        PlayQuiz.prototype.configLeft = 0;
        PlayQuiz.prototype.configRight = 0;
        PlayQuiz.prototype.configAnswer = 3;

        function PlayQuiz(engine, questions, id, SceneBack) {
            this.SceneBack = SceneBack;

            // Create the reset function
            this.reset = function(engine, questions, id) {
                this.engine.scenes[this.name] = new PlayQuiz(engine, questions, id);
                this.engine.changeScenes(this.name);
            }.bind(this, engine, questions, id);

            // If not given a set of questions, get them from localStorage
            if (typeof questions === 'undefined' || questions === null) {
                questions = new Questions('questionsAddition');
                questions.fetch();
            }

            PlayQuiz.__super__.constructor.call(this, engine, questions, id);
        }

        PlayQuiz.prototype.render = function(ctx, dt) {
            PlayQuiz.__super__.render.call(this, ctx, dt);
        };

        PlayQuiz.prototype.setupNumBar = function(numL, numR) {
            PlayQuiz.__super__.setupNumBar.call(this, this.getQuestion().get('numL'), this.getQuestion().get('numR'));
        };

        PlayQuiz.prototype.setupAnswer = function(answer) {
            PlayQuiz.__super__.setupAnswer.call(this, '?');
        };

        // Reset the current scene
        PlayQuiz.prototype.reset = function() {
            this.engine.scenes[this.name] = new PlayQuiz(this.engine);
            this.engine.changeScenes(this.name);
        };

        // Menu button click event
        PlayQuiz.prototype.clickMenu = function() {
            this.engine.changeScenes(this.SceneBack.name, this.SceneBack);
        };

        // Next button click event
        PlayQuiz.prototype.clickNext = function() {
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
                this.engine.scenes[this.name] = new PlayQuiz(this.engine, this.questions, this.getQuestionIdNext());
                this.engine.changeScenes(this.name);
            }
        };

        return PlayQuiz;

    })();
});
