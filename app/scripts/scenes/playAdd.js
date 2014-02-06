/*
    Scene: Play: PlayAdd
    Main game, addition mode
*/
/*global define */
define(['jquery', 'questions', 'play', 'victory'], function ($, Questions, Play, Victory) {
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
        Play.prototype.clickMenu = function() {
            return function(event) {
                this.engine.changeScenes('MenuChallengesQuestionsAdd', require('menuChallengesQuestionsAdd'));
            }.bind(this);
        };

        // Next button click event
        Play.prototype.clickNext = function() {
            var me = this;
            return function(event) {
                var nextId = me.getQuestionIdNext();

                // If no next question
                if (nextId === null) {
                    // If all questions complete, go to victory
                    if (me.questions === null || me.questions.complete()) {
                        me.engine.scenes.Victory = new Victory(me.engine, 'Simple Addition');
                        me.engine.changeScenes('Victory');
                    }
                    // Otherwise go back to the menu
                    else {
                        me.engine.changeScenes('MenuChallengesQuestionsAdd', require('menuChallengesQuestionsAdd'));
                    }

                }
                // Otherwise go to the next question in the set
                else {
                    me.engine.scenes[me.name] = new PlayAdd(me.engine, me.questions, me.getQuestionIdNext());
                    me.engine.changeScenes(me.name);
                }
            };
        };

        return PlayAdd;

    })();
});
