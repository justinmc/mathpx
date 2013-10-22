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

        function PlayAdd(engine) {
            PlayAdd.__super__.constructor.call(this, engine);

            // Setup the UI for add
            this.toolbarNumL.display = true;
            this.toolbarNumNegL.display = false;
            this.toolbarNumLText.text = "+";
            this.toolbarNumR.display = false;
            this.toolbarNumNegR.display = false;
            this.toolbarNumRText.text = "";
            this.toolbarTrashL.display = false;
            this.toolbarTrashR.display = true;
        }

        PlayAdd.prototype.render = function(ctx, dt) {
            // If we need a question
            if (this.question === null) {
                var numL = Math.floor(Math.random() * 10);
                var numR = Math.floor(Math.random() * 10);
                this.question = new Question({mode: this.mode, numL: numL, numR: numR});
                require("app").histories.add(this.question);
            }

            PlayAdd.__super__.render.call(this, ctx, dt);
        };


        PlayAdd.prototype.setupNumBar = function(numL, numR) {
            PlayAdd.__super__.setupNumBar.call(this, this.question.get("numL"), this.question.get("numR"));
        };

        PlayAdd.prototype.setupAnswer = function(answer) {
            PlayAdd.__super__.setupAnswer.call(this, this.question.get("numL") + this.question.get("numR"));
        };

        return PlayAdd;

    })();
});
