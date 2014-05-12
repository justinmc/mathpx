/*
    Scene: Play: PlayLearning
    Main game, learning mode
*/
/*global define */
define(['jquery', 'questions', 'play'], function ($, Questions, Play) {
    'use strict';

    return (function() {
        Play.extend(PlayLearning);

        PlayLearning.prototype.name = 'PlayLearning';
        PlayLearning.prototype.route = 'learning/play';

        PlayLearning.prototype.learning = true;

        PlayLearning.prototype.configLeft = 0;
        PlayLearning.prototype.configRight = 0;
        PlayLearning.prototype.configAnswer = 2;

        function PlayLearning(engine, questions, id, SceneBack) {
            // Create the reset function
            this.reset = function(engine, questions, id, SceneBack) {
                this.engine.scenes[this.name] = new PlayLearning(engine, questions, id);
                this.engine.changeScenes(this.name);
            }.bind(this, engine, questions, id, SceneBack);

            // If not given a set of questions, get them from localStorage
            if (typeof questions === 'undefined' || questions === null) {
                questions = new Questions('questionsLearning');
                questions.fetch();
            }

            PlayLearning.__super__.constructor.call(this, engine, questions, id, SceneBack);
        }

        /*PlayLearning.prototype.setupAnswer = function(answer) {
            PlayLearning.__super__.setupAnswer.call(this, '?');
        };
        */

        // Menu button click event
        PlayLearning.prototype.clickMenu = function() {
            this.engine.changeScenes('MenuLearning', require('menuLearning'));
        };

        // Next button click event
        PlayLearning.prototype.clickNext = function() {
            var qNext = this.questions.getNextIntelligent();
            console.log(this.questions, qNext);
            if (qNext.get('timeEnd')) {
                this.engine.scenes[this.name] = new PlayQuiz(this.engine, this.questions, qNext.get('id'), this.SceneBack);
            }
            else {
                this.engine.scenes[this.name] = new PlayLearning(this.engine, this.questions, qNext.get('id'));
            }
            this.engine.changeScenes(this.name);
        };

        return PlayLearning;

    })();
});
