/*
    Scene: Play
    The main game scene
*/
/*global define */
define(["jquery", "scene", "num", "numNeg", "text", "trash"], function ($, Scene, Num, NumNeg, Text, Trash) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Scene.extend(Play);

        Play.prototype.name = "Play";

        // Game stuff
        Play.prototype.textLeft = null;
        Play.prototype.textSign = null;
        Play.prototype.textRight = null;
        Play.prototype.textEquals = null;
        Play.prototype.textAnswer = null;
        Play.prototype.answerNums = [];

        function Play(engine) {
            Play.__super__.constructor.call(this, engine);

            // Create the number bar
            this.textLeft = this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 6), 40, 100, "0", "20px 'Press Start 2P'"));
            this.textSign = this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 3), 40, 100, "+", "20px 'Press Start 2P'"));
            this.textRight = this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 2), 40, 100, "0", "20px 'Press Start 2P'"));
            this.textEquals = this.entityAdd(new Text(Math.round(2 * this.engine.ctx.canvas.width / 3), 40, 100, "=", "20px 'Press Start 2P'"));
            this.textAnswer = this.entityAdd(new Text(Math.round(5 * this.engine.ctx.canvas.width / 6), 40, 100, "0", "20px 'Press Start 2P'"));

            // Create the toolbar 
            this.entityAdd(new Text(70, this.engine.ctx.canvas.height - 40, 100, "+", "20px 'Press Start 2P'"));
            this.entityAdd(new Num(100, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.entityAdd(new Text(210, this.engine.ctx.canvas.height - 40, 100, "-", "20px 'Press Start 2P'"));
            this.entityAdd(new NumNeg(240, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.entityAdd(new Trash(380, this.engine.ctx.canvas.height - 80));

            // Create the answer numbers
            for (var i = 0; i < 40; i++) {
                var num = new Num(this.engine.ctx.canvas.width - 260 + 40 * (i % 5), 60 + 60 * Math.floor(i / 5), null, null, false, false);
                this.answerNums.push(this.entityAdd(num));
                this.answerNums[i].display = false;
            }
        }

        Play.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Play.__super__.render.call(this, ctx, dt);

            // Display the correct numbers and signs
            var leftCount = this.getLeftCount(ctx);
            var rightCount = this.getRightCount(ctx);
            this.textLeft.text = leftCount;
            if (rightCount < 0) {
                this.textSign.text = "-";
            }
            else {
                this.textSign.text = "+";
            }
            this.textRight.text = Math.abs(rightCount);

            // Set up the answer
            var answer = leftCount + rightCount;
            for (var i = 0; i < this.answerNums.length; i++) {
                if (i < answer) {
                    this.answerNums[i].display = true;
                }
                else {
                    this.answerNums[i].display = false;
                }
            }
            this.textAnswer.text = answer;
        };

        // Count the numbers on the left side of the equation
        Play.prototype.getLeftCount = function(ctx) {
            var count = 0;
            var me = this;
            this.entities.forEach(function(entity) {
                if (entity.x < ctx.canvas.width / 3) {
                    if ("value" in entity) {
                        count += entity.value;
                    }
                }
            });

            return count;
        };

        // Count the numbers on the right side of the equation
        Play.prototype.getRightCount = function(ctx) {
            var count = 0;
            var me = this;
            this.entities.forEach(function(entity) {
                if ((entity.x > ctx.canvas.width / 3) && (entity.x < 2 * ctx.canvas.width / 3)) {
                    if ("value" in entity) {
                        count += entity.value;
                    }
                }
            });

            return count;
        };

        return Play;

    })();
});
