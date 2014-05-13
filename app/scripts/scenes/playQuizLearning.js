/*
    Scene: Play: PlayQuiz
    Main game, quiz mode for manual entry
*/
/*global define */
define(['jquery', 'questions', 'playQuiz', 'playLearning'], function ($, Questions, PlayQuiz, PlayLearning) {
    'use strict';

    return (function() {
        PlayQuiz.extend(PlayQuizLearning);

        PlayQuizLearning.prototype.name = 'PlayQuizLearning';
        PlayQuizLearning.prototype.route = 'learning/quiz';

        PlayQuizLearning.prototype.SceneBack = null;

        PlayQuizLearning.prototype.quiz = true;
        PlayQuizLearning.prototype.learning = true;

        PlayQuizLearning.prototype.configLeft = 0;
        PlayQuizLearning.prototype.configRight = 0;
        PlayQuizLearning.prototype.configAnswer = 3;

        function PlayQuizLearning(engine, questions, id, SceneBack) {
            this.SceneBack = SceneBack;

            if (typeof questions === 'undefined' || questions === null) {
                questions = new Questions('questionsLearning');
                questions.fetch();
            }

            // If not given a set of questions, get them from localStorage
            PlayQuizLearning.__super__.constructor.call(this, engine, questions, id);

            // Create the reset function
            this.reset = function(engine, questions, id) {
                this.engine.scenes[this.name] = new PlayQuizLearning(engine, questions, id);
                this.engine.changeScenes(this.name);
            }.bind(this, engine, questions, id);
        }

        PlayQuizLearning.prototype.render = function(ctx, dt) {
            PlayQuizLearning.__super__.render.call(this, ctx, dt);
        };

        // Menu button click event
        PlayQuizLearning.prototype.clickMenu = function() {
            this.engine.changeScenes('MenuLearning', require('menuLearning'));
        };

        // Next button click event
        PlayQuizLearning.prototype.clickNext = function() {
            var qNext = this.questions.getNextIntelligent();
            var name;
            if (qNext.get('timeEnd')) {
                this.engine.scenes['PlayQuizLearning'] = new PlayQuizLearning(this.engine, this.questions, qNext.get('id'));
                this.engine.changeScenes('PlayQuizLearning');
            }
            else {
                var PlayLearning = require('playLearning');
                this.engine.scenes['PlayLearning'] = new PlayLearning(this.engine, this.questions, qNext.get('id'));
                this.engine.changeScenes('PlayLearning');
            }
        };

        return PlayQuizLearning;

    })();
});
