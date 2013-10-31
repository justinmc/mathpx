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

        // UI Config
        // -1 = user controlled negative
        // 0 = auto
        // 1 = user controlled positive
        // 2 = user controlled positive and negative
        Play.prototype.configLeft = 2;
        Play.prototype.configRight = 2;
        Play.prototype.configAnswer = 0;

        // UI
        Play.prototype.textLeft = null;
        Play.prototype.textSign = null;
        Play.prototype.textRight = null;
        Play.prototype.textAnswer = null;
        Play.prototype.toolbarNumL = null;
        Play.prototype.toolbarNumR = null;
        Play.prototype.toolbarNumA = null;
        Play.prototype.toolbarNumNegL = null;
        Play.prototype.toolbarNumNegR = null;
        Play.prototype.toolbarNumNegA = null;
        Play.prototype.toolbarNumLText = null;
        Play.prototype.toolbarNumNegLText = null;
        Play.prototype.toolbarNumRText = null;
        Play.prototype.toolbarNumNegRText = null;
        Play.prototype.toolbarNumAText = null;
        Play.prototype.toolbarNumNegAText = null;
        Play.prototype.toolbarTrashL = null;
        Play.prototype.toolbarTrashR = null;
        Play.prototype.toolbarTrashA = null;
        Play.prototype.buttonGo = null;
        Play.prototype.questionNumsL = [];
        Play.prototype.questionNumsNegL = [];
        Play.prototype.questionNumsR = [];
        Play.prototype.questionNumsNegR = [];
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
            this.textAnswer = this.entityAdd(new Text(Math.round(5 * this.engine.ctx.canvas.width / 6), 40, 100, "0", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.buttonGo = this.entityAdd(new Button(Math.round(2 * this.engine.ctx.canvas.width / 3), 10, 50, 40, "=", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickGo(), 16, "rgb(255, 255, 255)"));

            // Create all possible toolbar entities 
            this.toolbarNumLText = this.entityAdd(new Text(20, this.engine.ctx.canvas.height - 40, 100, "+", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumL = this.entityAdd(new Num(50, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegLText = this.entityAdd(new Text(120, this.engine.ctx.canvas.height - 40, 100, "+", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumNegL = this.entityAdd(new NumNeg(150, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumRText = this.entityAdd(new Text(350, this.engine.ctx.canvas.height - 40, 100, "-", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumNegRText = this.entityAdd(new Text(450, this.engine.ctx.canvas.height - 40, 100, "-", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumR = this.entityAdd(new Num(380, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegR = this.entityAdd(new NumNeg(480, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumAText = this.entityAdd(new Text(670, this.engine.ctx.canvas.height - 40, 100, "-", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumA = this.entityAdd(new Num(700, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, 0, this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegAText = this.entityAdd(new Text(770, this.engine.ctx.canvas.height - 40, 100, "-", "24px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.toolbarNumNegA = this.entityAdd(new NumNeg(800, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarTrashL = this.entityAdd(new Trash(234, this.engine.ctx.canvas.height - 80));
            this.toolbarTrashR = this.entityAdd(new Trash(560, this.engine.ctx.canvas.height - 80));
            this.toolbarTrashA = this.entityAdd(new Trash(880, this.engine.ctx.canvas.height - 80));
            this.entityAdd(new Button(10, 10, 60, 40, "Menu", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickMenu(), 16, "rgb(255, 255, 255)"));

            // Create the answer numbers
            this.answerNums = [];
            var coords;
            for (var i = 0; i < 40; i++) {
                coords = this.getNumPosAnswer(i);
                var num = new Num(coords.x, coords.y, null, null, null, null, false, false);
                this.answerNums.push(this.entityAdd(num));
                this.answerNums[i].display = false;
            }
            this.answerNumsNeg = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosAnswer(i);
                var numNeg = new NumNeg(coords.x, coords.y, null, null, null, null, false, false);
                this.answerNumsNeg.push(this.entityAdd(numNeg));
                this.answerNumsNeg[i].display = false;
            }

            // Create the questionL numbers
            this.questionNumsL = [];
            var coords;
            for (var i = 0; i < 40; i++) {
                coords = this.getNumPosLeft(i);
                var num = new Num(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsL.push(this.entityAdd(num));
                this.questionNumsL[i].display = false;
            }
            this.questionNumsNegL = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosLeft(i);
                var numNeg = new NumNeg(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsNegL.push(this.entityAdd(numNeg));
                this.questionNumsNegL[i].display = false;
            }

            // Create the questionR numbers
            this.questionNumsR = [];
            var coords;
            for (var i = 0; i < 40; i++) {
                coords = this.getNumPosRight(i);
                var num = new Num(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsR.push(this.entityAdd(num));
                this.questionNumsR[i].display = false;
            }
            this.questionNumsNegL = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosRight(i);
                var numNeg = new NumNeg(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsNegL.push(this.entityAdd(numNeg));
                this.questionNumsNegL[i].display = false;
            }

            // Set up the UI
            this.setupUI();
        }

        Play.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(87, 124, 75)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            // Setup the number bar
            var leftCount = this.getLeftCount(ctx);
            var rightCount = this.getRightCount(ctx);
            this.setupNumBar(leftCount, rightCount);

            // Text answer
            if (this.question !== null) {
                this.textAnswer.text = this.question.numL + this.question.numR;
            }
            this.textAnswer.text = leftCount + rightCount;

            // Render the count nums
            if (this.configAnswer === 0) {
                this.setupNums(this.answerNums, this.answerNumsNeg, leftCount + rightCount);
            }
            if (this.configLeft === 0) {
                this.setupNums(this.questionNumsL, this.questionNumsNegL, this.question.get("numL"));
            }
            if (this.configRight === 0) {
                this.setupNums(this.questionNumsR, this.questionNumsNegR, this.question.get("numR"));
            }

            // Render entities
            Play.__super__.render.call(this, ctx, dt);
        };

        // Set the visibility of UI elements based on config
        Play.prototype.setupUI = function() {
            this.setupUISection(this.configLeft, this.toolbarNumL, this.toolbarNumNegL, this.toolbarNumLText, this.toolbarNumNegLText, this.toolbarTrashL);
            this.setupUISection(this.configRight, this.toolbarNumR, this.toolbarNumNegR, this.toolbarNumRText, this.toolbarNumNegRText, this.toolbarTrashR);
            this.setupUISection(this.configAnswer, this.toolbarNumA, this.toolbarNumNegA, this.toolbarNumAText, this.toolbarNumNegAText, this.toolbarTrashA);
        };

        // Setup a given left/right/answer section UI
        Play.prototype.setupUISection = function(config, num, numNeg, numText, numNegText, trash) {
            if (config === 0) {
                num.display = false;
                numNeg.display = false;
                numText.text = "";
                numNegText.text = "";
                trash.display = false;
            }
            else if (config === 1) {
                num.display = true;
                numNeg.display = false;
                numText.text = "+";
                numNegText.text = "";
                trash.display = true;
            }
            else if (config === -1) {
                num.display = false;
                numNeg.display = true;
                numText.text = "";
                numNegText.text = "-";
                trash.display = true;
            }
            else {
                num.display = true;
                numNeg.display = true;
                numText.text = "+";
                numNegText.text = "-";
                trash.display = true;
            }
        }

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

        // Setup the left/right/answer numbers and text
        Play.prototype.setupNums = function(numsArray, numsArrayNeg, value) {
            // Negative numbers
            for (var i = 0; i < numsArrayNeg.length; i++) {
                if (-1 * i > value) {
                    numsArrayNeg[i].display = true;
                }
                else {
                    numsArrayNeg[i].display = false;
                }
            }

            // Positive numbers
            for (i = 0; i < numsArray.length; i++) {
                if (i < value) {
                    numsArray[i].display = true;
                }
                else {
                    numsArray[i].display = false;
                }
            }
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

                        // Get the right location to rack up at
                        var coords = {};
                        if (me.configLeft !== 0) {
                            coords = me.getNumPosLeft(answer++);
                        }
                        else if (me.configRight !== 0) {
                            coords = me.getNumPosRight(answer++);
                        }
                        else {
                            coords = me.getNumPosAnswer(answer++);
                        } 

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
        Play.prototype.getNumPosAnswer = function(i) {
            var coords = {x: 0, y: 0};
            coords.x = this.engine.ctx.canvas.width - (3 * this.engine.ctx.canvas.width / 12) + 40 * (i % 5);
            coords.y = 60 + 60 * Math.floor(i / 5);

            return coords;
        };
        Play.prototype.getNumPosRight = function(i) {
            var coords = {x: 0, y: 0};
            coords.x = (this.engine.ctx.canvas.width / 3) + 10 + 40 * (i % 5);
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
