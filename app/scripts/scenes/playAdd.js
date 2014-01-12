/*
    Scene: Play: PlayAdd
    Main game, addition mode
*/
/*global define */
define(["jquery", "backbone", "questions", "question", "play", "victory", "entity", "num", "numNeg", "text", "trash", "button"], function ($, Backbone, Questions, Question, Play, Victory, Entity, Num, NumNeg, Text, Trash, Button) {
    "use strict";

    return (function() {
        Play.extend(PlayAdd);

        PlayAdd.prototype.name = "PlayAdd";
        PlayAdd.prototype.route = "challenges/add/play";

        PlayAdd.prototype.configLeft = 0;
        PlayAdd.prototype.configRight = 0;
        PlayAdd.prototype.configAnswer = 1;

        function PlayAdd(engine, questions, id) {
            PlayAdd.__super__.constructor.call(this, engine);

            // If we were given a set of questions, save them
            if (typeof questions !== "undefined" && questions !== null) {
                this.questions = questions;
            }
            // Otherwise create an empty set of questions
            else {
                this.questions = new Questions();
            }

            // If we were given a question id, save it
            if (typeof id !== "undefined" && id !== null && this.questions.length) {
                this.questionId = id;

                // Set the timeStart on the question if not already set
                if (!this.getQuestion().has("timeStart")) {
                    this.getQuestion().set("timeStart", new Date().getTime());
                    this.getQuestion().save();
                }
            }
            // Otherwise if we have a set of quesions, use the first one
            else if (this.questions.length > 0) {
                this.questionId = this.questions.at(0).get("id");
            }
            // Otherwise create a random question
            else {
                var numL = Math.floor(Math.random() * 10);
                var numR = Math.floor(Math.random() * (10 - numL));
                this.questions.create(new Question({mode: this.mode, numL: numL, numR: numR}));
                this.questionId = this.questions.at(0).get("id");
            }

            // Set up the UI
            this.setupUI();
        }

        PlayAdd.prototype.render = function(ctx, dt) {
            PlayAdd.__super__.render.call(this, ctx, dt);
        };


        PlayAdd.prototype.setupNumBar = function(numL, numR) {
            PlayAdd.__super__.setupNumBar.call(this, this.getQuestion().get("numL"), this.getQuestion().get("numR"));
        };

        PlayAdd.prototype.setupAnswer = function(answer) {
            PlayAdd.__super__.setupAnswer.call(this, "?");
        };

        // Reset the current scene
        PlayAdd.prototype.reset = function() {
            this.engine.scenes[this.name] = new PlayAdd(this.engine);
            this.engine.changeScenes(this.name);
        };

        // Menu button click event
        Play.prototype.clickMenu = function() {
            var me = this;
            return function(event) {
                me.engine.changeScenes("MenuChallengesQuestionsAdd", require("menuChallengesQuestionsAdd"));
            };
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
                        me.engine.scenes.Victory = new Victory(me.engine, "Simple Addition");
                        me.engine.changeScenes("Victory");
                    }
                    // Otherwise go back to the menu
                    else {
                        me.engine.changeScenes("MenuChallengesQuestionsAdd", require("menuChallengesQuestionsAdd"));
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
