/*
    Scene: Play: PlayAdd
    Main game, addition mode
*/
/*global define */
define(["jquery", "backbone", "question", "play", "entity", "num", "numNeg", "text", "trash", "button"], function ($, Backbone, Question, Play, Entity, Num, NumNeg, Text, Trash, Button) {
    "use strict";

    return (function() {
        Play.extend(PlayAdd);

        PlayAdd.prototype.name = "PlayAdd";
        PlayAdd.prototype.route = "challenges/add/play";

        PlayAdd.prototype.configLeft = 0;
        PlayAdd.prototype.configRight = 0;
        PlayAdd.prototype.configAnswer = 1;

        function PlayAdd(engine, question) {
            PlayAdd.__super__.constructor.call(this, engine);

            // Save the parameter
            if (typeof question !== "undefined" && question !== null) {
                this.question = question;

                // Set the timeStart on the question if not already set
                if (!this.question.has("timeStart")) {
                    this.question.set("timeStart", new Date().getTime());
                    this.question.save();
                }
            }
            // If we need a question
            else {
                var numL = Math.floor(Math.random() * 10);
                var numR = Math.floor(Math.random() * 10);
                this.question = new Question({mode: this.mode, numL: numL, numR: numR});
                require("app").histories.add(this.question);
            }

            // Set up the UI
            this.setupUI();
        }

        PlayAdd.prototype.render = function(ctx, dt) {
            PlayAdd.__super__.render.call(this, ctx, dt);
        };


        PlayAdd.prototype.setupNumBar = function(numL, numR) {
            PlayAdd.__super__.setupNumBar.call(this, this.question.get("numL"), this.question.get("numR"));
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
                me.engine.changeScenes("MenuChallengesAdd", require("menuChallengesAdd"));
            };
        };

        return PlayAdd;

    })();
});
