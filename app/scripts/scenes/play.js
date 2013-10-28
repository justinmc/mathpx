/*
    Scene: Play
    The main game scene
*/
/*global define */
define(["jquery", "backbone", "question", "scene", "entity", "num", "numNeg", "text", "trash", "button", "check", "tween"], function ($, Backbone, Question, Scene, Entity, Num, NumNeg, Text, Trash, Button, Check, Tween) {
    "use strict";

    return (function() {
        Scene.extend(Play);

        Play.prototype.name = "Play";

        // Current question
        Play.prototype.question = null;

        // True for play mode, false for done
        Play.prototype.modePlay = true;

        // UI
        Play.prototype.textLeft = null;
        Play.prototype.textSign = null;
        Play.prototype.textRight = null;
        Play.prototype.textEquals = null;
        Play.prototype.textAnswer = null;
        Play.prototype.toolbarNumL = null;
        Play.prototype.toolbarNumR = null;
        Play.prototype.toolbarNumNegL = null;
        Play.prototype.toolbarNumNegR = null;
        Play.prototype.toolbarNumLText = null;
        Play.prototype.toolbarNumRText = null;
        Play.prototype.toolbarTrashL = null;
        Play.prototype.toolbarTrashR = null;
        Play.prototype.buttonGo = null;
        Play.prototype.answerNums = [];
        Play.prototype.answerNumsNeg = [];
        Play.prototype.activeNums = [];
        Play.prototype.activeNumsNeg = [];

        function Play(engine) {
            Play.__super__.constructor.call(this, engine);

            // Create the lines
            this.entityAdd(new Entity(this.engine.ctx.canvas.width / 3, 100, 4, this.engine.ctx.canvas.height - 200, "rgb(255, 255, 255)"));
            this.entityAdd(new Entity(2 * this.engine.ctx.canvas.width / 3, 100, 4, this.engine.ctx.canvas.height - 200, "rgb(255, 255, 255)"));

            // Create the number bar
            this.textLeft = this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 6), 40, 100, "0", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.textSign = this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 3), 40, 100, "+", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.textRight = this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 2), 40, 100, "0", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.textEquals = this.entityAdd(new Text(Math.round(2 * this.engine.ctx.canvas.width / 3), 40, 100, "=", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.textAnswer = this.entityAdd(new Text(Math.round(5 * this.engine.ctx.canvas.width / 6), 40, 100, "0", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create all possible toolbar entities 
            this.toolbarNumLText = this.entityAdd(new Text(20, this.engine.ctx.canvas.height - 40, 100, "+", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumL = this.entityAdd(new Num(50, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegL = this.entityAdd(new NumNeg(50, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumRText = this.entityAdd(new Text(350, this.engine.ctx.canvas.height - 40, 100, "-", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumR = this.entityAdd(new Num(380, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegR = this.entityAdd(new NumNeg(380, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarTrashL = this.entityAdd(new Trash(234, this.engine.ctx.canvas.height - 80));
            this.toolbarTrashR = this.entityAdd(new Trash(560, this.engine.ctx.canvas.height - 80));
            this.buttonGo = this.entityAdd(new Button(740, this.engine.ctx.canvas.height - 70, 80, 40, "Go!", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickGo(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Button(840, this.engine.ctx.canvas.height - 70, 80, 40, "Menu", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickMenu(), 16, "rgb(255, 255, 255)"));

            // Create the answer numbers
            this.answerNums = [];
            var coords;
            for (var i = 0; i < 40; i++) {
                coords = this.getNumPosRight(i);
                var num = new Num(coords.x, coords.y, null, null, false, false);
                this.answerNums.push(this.entityAdd(num));
                this.answerNums[i].display = false;
            }
            this.answerNumsNeg = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosRight(i);
                var numNeg = new NumNeg(coords.x, coords.y, null, null, false, false);
                this.answerNumsNeg.push(this.entityAdd(numNeg));
                this.answerNumsNeg[i].display = false;
            }

            // Set up the UI
            this.toolbarNumL.display = true;
            this.toolbarNumNegL.display = false;
            this.toolbarNumLText.text = "+";
            this.toolbarNumR.display = false;
            this.toolbarNumNegR.display = true;
            this.toolbarNumRText.text = "-";
            this.toolbarTrashL.display = false;
            this.toolbarTrashR.display = true;
        }

        Play.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(87, 124, 75)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            // Setup the number bar
            var leftCount = this.getLeftCount(ctx);
            var rightCount = this.getRightCount(ctx);
            this.setupNumBar(leftCount, rightCount);

            // Render the answer
            this.setupAnswer(leftCount + rightCount);

            // Render entities
            Play.__super__.render.call(this, ctx, dt);
        };

        // Setup the number bar numbers and signs
        Play.prototype.setupNumBar = function(numL, numR) {
            if (this.modePlay) {
                this.textLeft.text = numL;
                if (numR < 0) {
                    this.textSign.text = "-";
                }
                else {
                    this.textSign.text = "+";
                }
                this.textRight.text = Math.abs(numR);
            }
        };

        // Setup the answer numbers and text
        Play.prototype.setupAnswer = function(answer) {
            // Negative numbers
            for (var i = 0; i < this.answerNumsNeg.length; i++) {
                if (-1 * i > answer) {
                    this.answerNumsNeg[i].display = true;
                }
                else {
                    this.answerNumsNeg[i].display = false;
                }
            }

            // Positive numbers
            for (i = 0; i < this.answerNums.length; i++) {
                if (i < answer) {
                    this.answerNums[i].display = true;
                }
                else {
                    this.answerNums[i].display = false;
                }
            }

            // Text answer
            this.textAnswer.text = answer;
        };

        // Add a new draggable number, pos or neg
        Play.prototype.addActiveNum = function(num) {
            if (num.value > 0) {
                this.activeNums.push(num);
            }
            else {
                this.activeNumsNeg.push(num);
            }
        };

        // Go button click event
        Play.prototype.clickGo = function() {
            var me = this;
            return function(event) {
                // Annihilate all extra pos/neg nums
                var deferreds = [];
                while (me.activeNums.length && me.activeNumsNeg.length) {
                    var deferred = new $.Deferred();
                    var entity1 = me.activeNums.pop();
                    var entity2 = me.activeNumsNeg.pop();
                    var midpoint = Scene.getMidpoint(entity1, entity2);
                    entity1.value = 0;
                    entity2.value = 0;
                    entity1.componentAdd(new Tween(entity1, midpoint.x, midpoint.y, 20, me.numAnnihilateAnimate(deferred)));
                    entity2.componentAdd(new Tween(entity2, midpoint.x, midpoint.y, 20, me.numAnnihilate()));
                    deferreds.push(deferred);
                }

                // After everything has finished annihilating, rack up the remaining nums
                $.when.apply($, deferreds).then(function() {
                    // Get the correct nums to rack, neg or pos
                    var activeNums = me.activeNums;
                    var sign = 1;
                    if (me.activeNumsNeg.length) {
                        activeNums = me.activeNumsNeg;
                        sign = -1;
                    }

                    // Add up remaining positives or negatives
                    var answer = 0;
                    while (activeNums.length) {
                        var entity = activeNums.pop();
                        var coords = me.getNumPosLeft(answer++);
                        entity.spriteAnimateStop();
                        entity.componentAdd(new Tween(entity, coords.x, coords.y, 20));
                    }

                    // Change the UI to the final mode
                    me.modePlay = false;
                    me.buttonGo.text = "Restart";
                    me.textLeft.text = "";
                    me.textSign.text = sign * answer;
                    me.textRight.text = "";

                    // Show a check on the answers
                    me.entityAdd(new Check(me.textSign.x + 64, me.textSign.y - 32));
                    me.entityAdd(new Check(me.textAnswer.x + 64, me.textAnswer.y - 32));
                });
            };
        };

        // When nums collide
        Play.prototype.numAnnihilate = function(deferred) {
            var me = this;
            return function(event, entity) {
                entity.display = false;
                me.entityRemove(entity);
                if (typeof deferred !== "undefined") {
                    deferred.resolve();
                }
            };
        };
        Play.prototype.numAnnihilateAnimate = function(deferred) {
            var me = this;
            return function(event, entity) {
                entity.spriteAnimate("annihilate", 1, me.numAnnihilate(deferred));
            };
        };

        // Menu button click event
        Play.prototype.clickMenu = function() {
            var me = this;
            return function(event) {
                me.engine.changeScenes("Menu");
            };
        };

        // Keyup event
        Play.prototype.keyup = function(event) {
            // If escape key, go to Menu scene
            if (event.keyCode === 27) {
                this.engine.changeScenes("Menu");
            }
        };

        // Return the coords of a final static position for a number
        Play.prototype.getNumPosRight = function(i) {
            var coords = {x: 0, y: 0};
            coords.x = this.engine.ctx.canvas.width - (3 * this.engine.ctx.canvas.width / 12) + 40 * (i % 5);
            coords.y = 60 + 60 * Math.floor(i / 5);

            return coords;
        };
        Play.prototype.getNumPosLeft = function(i) {
            var coords = {x: 0, y: 0};
            coords.x = 40 * (i % 5);
            coords.y = 60 + 60 * Math.floor(i / 5);

            return coords;
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
