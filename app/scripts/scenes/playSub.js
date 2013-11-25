/*
    Scene: Play: PlaySub
    Main game, subtraction mode
*/
/*global define */
define(["jquery", "backbone", "question", "play", "entity", "num", "numNeg", "text", "trash", "button"], function ($, Backbone, Question, Play, Entity, Num, NumNeg, Text, Trash, Button) {
    "use strict";

    return (function() {
        Play.extend(PlaySub);

        PlaySub.prototype.name = "PlaySub";
        PlaySub.prototype.route = "challenges/sub/play";

        function PlaySub(engine) {
            PlaySub.__super__.constructor.call(this, engine);

            // Set up the UI for subtract
            this.toolbarNumL.display = true;
            this.toolbarNumNegL.display = false;
            this.toolbarNumLText.text = "+";
            this.toolbarNumR.display = false;
            this.toolbarNumNegR.display = true;
            this.toolbarNumRText.text = "-";
            this.toolbarTrashL.display = true;
            this.toolbarTrashR.display = true;
        }

        PlaySub.prototype.render = function(ctx, dt) {
            // If we need a question
            if (this.question === null) {
                var numL = Math.floor(Math.random() * 10);
                var numR = -1 * Math.floor(Math.random() * 10);
                this.question = new Question({mode: this.mode, numL: numL, numR: numR});
                require("app").histories.add(this.question);
            }

            PlaySub.__super__.render.call(this, ctx, dt);
        };

        PlaySub.prototype.setupNumBar = function(numL, numR) {
            PlaySub.__super__.setupNumBar.call(this, this.question.get("numL"), this.question.get("numR"));
        };

        PlaySub.prototype.setupAnswer = function(answer) {
            PlaySub.__super__.setupAnswer.call(this, this.question.get("numL") + this.question.get("numR"));
        };

        return PlaySub;

    })();
});
