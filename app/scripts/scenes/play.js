/*
    Scene: Play
    The main game scene
*/
/*global define */
define(['jquery', 'backbone', 'question', 'questions', 'scene', 'entity', 'num', 'numNeg', 'textPx', 'trash', 'buttonPx', 'check', 'x', 'tween', 'draggable', 'dragCreate'], function ($, Backbone, Question, Questions, Scene, Entity, Num, NumNeg, TextPx, Trash, ButtonPx, Check, X, Tween, Draggable, DragCreate) {
    'use strict';

    return (function() {
        Scene.extend(Play);

        Play.prototype.name = 'Play';
        Play.prototype.route = 'play';

        // Current question set
        Play.prototype.questions = null;
        Play.prototype.questionId = null;

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
        Play.prototype.buttonNext = null;
        Play.prototype.buttonAgain = null;
        Play.prototype.questionNumsL = [];
        Play.prototype.questionNumsNegL = [];
        Play.prototype.questionNumsR = [];
        Play.prototype.questionNumsNegR = [];
        Play.prototype.answerNums = [];
        Play.prototype.answerNumsNeg = [];
        Play.prototype.activeNumsL = [];
        Play.prototype.activeNumsLNeg = [];
        Play.prototype.activeNumsR = [];
        Play.prototype.activeNumsRNeg = [];
        Play.prototype.activeNumsA = [];
        Play.prototype.activeNumsANeg = [];

        function Play(engine, questions, id) {
            Play.__super__.constructor.call(this, engine);

            // If we were given a set of questions, save them
            if (typeof questions !== 'undefined' && questions !== null) {
                this.questions = questions;
            }
            // Otherwise create an empty set of questions
            else {
                this.questions = new Questions();
            }

            // If we were given a question id, save it
            if (typeof id !== 'undefined' && id !== null && this.questions.length) {
                this.questionId = id;
            }
            // Otherwise if we have a set of quesions, use the first one not complete, else the last one
            else if (this.questions.length > 0) {
                var question = this.questions.findWhere({timeEnd: null});
                if (typeof question === 'undefined') {
                    question = this.questions.at(this.questions.length - 1);
                }
                this.questionId = question.get('id');
            }

            // Set the timeStart on the question if not already set
            if (this.getQuestion() && !this.getQuestion().has('timeStart')) {
                this.getQuestion().set('timeStart', new Date().getTime());
                this.getQuestion().save();
            }

            // Reset objects for deep copy
            this.questionNumsL = [];
            this.questionNumsNegL = [];
            this.questionNumsR = [];
            this.questionNumsNegR = [];
            this.answerNums = [];
            this.answerNumsNeg = [];
            this.activeNumsL = [];
            this.activeNumsLNeg = [];
            this.activeNumsR = [];
            this.activeNumsRNeg = [];
            this.activeNumsA = [];
            this.activeNumsANeg = [];

            // Create the lines
            this.entityAdd(new Entity(this.engine.ctx.canvas.width / 3, 100, 4, this.engine.ctx.canvas.height - 200, 'rgb(255, 255, 255)'));
            this.entityAdd(new Entity(2 * this.engine.ctx.canvas.width / 3, 100, 4, this.engine.ctx.canvas.height - 200, 'rgb(255, 255, 255)'));

            // Create the number bar
            this.textLeft = this.entityAdd(new TextPx(Math.round(this.engine.ctx.canvas.width / 6), 40, 100, '0', '24px \'Press Start 2P\''));
            this.textSign = this.entityAdd(new TextPx(Math.round(this.engine.ctx.canvas.width / 3), 40, 100, '+', '24px \'Press Start 2P\''));
            this.textRight = this.entityAdd(new TextPx(Math.round(this.engine.ctx.canvas.width / 2), 40, 100, '0', '24px \'Press Start 2P\''));
            this.textAnswer = this.entityAdd(new TextPx(Math.round(5 * this.engine.ctx.canvas.width / 6), 40, 100, '0', '24px \'Press Start 2P\''));
            this.buttonGo = this.entityAdd(new ButtonPx(Math.round(2 * this.engine.ctx.canvas.width / 3), 10, '=', this.clickGo(), 50, 40));
            this.buttonNext = this.entityAdd(new ButtonPx(Math.round(2 * this.engine.ctx.canvas.width / 3), 10, '->', this.clickNext(), 50, 40));
            this.buttonNext.display = false;
            this.buttonAgain = this.entityAdd(new ButtonPx(Math.round(2 * this.engine.ctx.canvas.width / 3), 10, 'Again', this.clickAgain(), 60, 40, 'rgb(190, 190, 227)'));
            this.buttonAgain.display = false;

            // Create all possible toolbar entities 
            this.toolbarNumLText = this.entityAdd(new TextPx(20, this.engine.ctx.canvas.height - 40, 100, '+', '24px \'Press Start 2P\''));
            this.toolbarNumL = this.entityAdd(new Num(50, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegLText = this.entityAdd(new TextPx(120, this.engine.ctx.canvas.height - 40, 100, '+', '24px \'Press Start 2P\''));
            this.toolbarNumNegL = this.entityAdd(new NumNeg(150, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumRText = this.entityAdd(new TextPx(350, this.engine.ctx.canvas.height - 40, 100, '-', '24px \'Press Start 2P\''));
            this.toolbarNumNegRText = this.entityAdd(new TextPx(450, this.engine.ctx.canvas.height - 40, 100, '-', '24px \'Press Start 2P\''));
            this.toolbarNumR = this.entityAdd(new Num(380, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegR = this.entityAdd(new NumNeg(480, this.engine.ctx.canvas.height - 80, 0, 0, 2 * this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumAText = this.entityAdd(new TextPx(670, this.engine.ctx.canvas.height - 40, 100, '-', '24px \'Press Start 2P\''));
            this.toolbarNumA = this.entityAdd(new Num(700, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, 0, this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarNumNegAText = this.entityAdd(new TextPx(770, this.engine.ctx.canvas.height - 40, 100, '-', '24px \'Press Start 2P\''));
            this.toolbarNumNegA = this.entityAdd(new NumNeg(800, this.engine.ctx.canvas.height - 80, 2 * this.engine.ctx.canvas.width / 3, 0, this.engine.ctx.canvas.width / 3, this.engine.ctx.canvas.height, true, false));
            this.toolbarTrashL = this.entityAdd(new Trash(234, this.engine.ctx.canvas.height - 80));
            this.toolbarTrashR = this.entityAdd(new Trash(560, this.engine.ctx.canvas.height - 80));
            this.toolbarTrashA = this.entityAdd(new Trash(880, this.engine.ctx.canvas.height - 80));
            this.entityAdd(new ButtonPx(10, 10, 'Menu', this.clickMenu(), 60, 40, 'rgb(190, 190, 227)'));

            // Create the answer numbers
            this.answerNums = [];
            var i, coords, num, numNeg;
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosAnswer(i);
                num = new Num(coords.x, coords.y, null, null, null, null, false, false);
                this.answerNums.push(this.entityAdd(num));
                this.answerNums[i].display = false;
            }
            this.answerNumsNeg = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosAnswer(i);
                numNeg = new NumNeg(coords.x, coords.y, null, null, null, null, false, false);
                this.answerNumsNeg.push(this.entityAdd(numNeg));
                this.answerNumsNeg[i].display = false;
            }

            // Create the questionL numbers
            this.questionNumsL = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosLeft(i);
                num = new Num(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsL.push(this.entityAdd(num));
                this.questionNumsL[i].display = false;
            }
            this.questionNumsNegL = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosLeft(i);
                numNeg = new NumNeg(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsNegL.push(this.entityAdd(numNeg));
                this.questionNumsNegL[i].display = false;
            }

            // Create the questionR numbers
            this.questionNumsR = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosRight(i);
                num = new Num(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsR.push(this.entityAdd(num));
                this.questionNumsR[i].display = false;
            }
            this.questionNumsNegR = [];
            for (i = 0; i < 40; i++) {
                coords = this.getNumPosRight(i);
                numNeg = new NumNeg(coords.x, coords.y, null, null, null, null, false, false);
                this.questionNumsNegR.push(this.entityAdd(numNeg));
                this.questionNumsNegR[i].display = false;
            }

            // Set up the UI
            this.setupUI();
        }

        Play.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(87, 124, 75)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            var leftCount = this.activeNumsL.length - this.activeNumsLNeg.length;
            var rightCount = this.activeNumsR.length - this.activeNumsRNeg.length;

            // If playing, update the UI
            if (this.modePlay) {
                // Setup the number bar
                this.setupNumBar(leftCount, rightCount);

                // Text answer
                if ((this.configAnswer === 0) && (this.getQuestion() !== null)) {
                    this.textAnswer.text = this.getQuestion().get('numL') + this.getQuestion().get('numR');
                }
                else if (this.configAnswer === 0) {
                    this.textAnswer.text = leftCount + rightCount;
                }
                else {
                    this.textAnswer.text = this.activeNumsA.length - this.activeNumsANeg.length;
                }
            }

            // Render the count nums
            if (this.configAnswer === 0) {
                this.setupNums(this.answerNums, this.answerNumsNeg, leftCount + rightCount);
            }
            if (this.configLeft === 0) {
                this.setupNums(this.questionNumsL, this.questionNumsNegL, this.getQuestion().get('numL'));
            }
            if (this.configRight === 0) {
                this.setupNums(this.questionNumsR, this.questionNumsNegR, this.getQuestion().get('numR'));
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
                numText.text = '';
                numNegText.text = '';
                trash.display = false;
            }
            else if (config === 1) {
                num.display = true;
                numNeg.display = false;
                numText.text = '+';
                numNegText.text = '';
                trash.display = true;
            }
            else if (config === -1) {
                num.display = false;
                numNeg.display = true;
                numText.text = '';
                numNegText.text = '-';
                trash.display = true;
            }
            else {
                num.display = true;
                numNeg.display = true;
                numText.text = '+';
                numNegText.text = '-';
                trash.display = true;
            }
        };

        // Setup the number bar numbers and signs
        Play.prototype.setupNumBar = function(numL, numR) {
            if (this.modePlay) {
                this.textLeft.text = numL;
                if (numR < 0) {
                    this.textSign.text = '-';
                }
                else {
                    this.textSign.text = '+';
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
                if (num.x < this.engine.ctx.canvas.width / 3) {
                    this.activeNumsL.push(num);
                }
                else if (num.x < 2 * this.engine.ctx.canvas.width / 3) {
                    this.activeNumsR.push(num);
                }
                else {
                    this.activeNumsA.push(num);
                }
            }
            else {
                if (num.x < this.engine.ctx.canvas.width / 3) {
                    this.activeNumsLNeg.push(num);
                }
                else if (num.x < 2 * this.engine.ctx.canvas.width / 3) {
                    this.activeNumsRNeg.push(num);
                }
                else {
                    this.activeNumsANeg.push(num);
                }
            }
        };

        // Returns racked nums in given array
        Play.prototype.getNumsRacked = function(nums) {
            var numsRacked = [];
            for (var i in nums) {
                var num = nums[i];

                // Only visible nums
                if (num.display) {
                    numsRacked.push(num);
                }
            }

            return numsRacked;
        };

        // Go button click event
        Play.prototype.clickGo = function() {
            var me = this;
            return function(event) {
                // Remove the UI numbers
                me.modeChangeReview();

                // Get the correct numbers to animate
                var numsL = me.activeNumsL.concat(me.getNumsRacked(me.questionNumsL));
                var numsLNeg = me.activeNumsLNeg.concat(me.getNumsRacked(me.questionNumsNegL));
                var numsR = me.activeNumsR.concat(me.getNumsRacked(me.questionNumsR));
                var numsRNeg = me.activeNumsRNeg.concat(me.getNumsRacked(me.questionNumsNegR));

                // Annihilate all active pos/neg nums in left and right and answer
                var deferreds = me.sectionAnnihilate(numsL, numsLNeg);
                deferreds.concat(me.sectionAnnihilate(numsR, numsRNeg));
                deferreds.concat(me.sectionAnnihilate(me.activeNumsA, me.activeNumsANeg));

                // After left/right have annihilated individually, annihilate between left and right
                $.when.apply($, deferreds).then(function() {
                    // Get pos/neg nums out of remaining nums and annihilate them
                    var numsLAnnihilated = numsL.length ? numsL : numsLNeg;
                    var numsRAnnihilated = numsR.length ? numsR : numsRNeg;
                    var numsLR = [];
                    var numsLRNeg = [];
                    var i, num;
                    for (i in numsLAnnihilated) {
                        num = numsLAnnihilated[i];
                        if (num.value > 0) {
                            numsLR.push(num);
                        }
                        else {
                            numsLRNeg.push(num);
                        }
                    }
                    for (i in numsRAnnihilated) {
                        num = numsRAnnihilated[i];
                        if (num.value > 0) {
                            numsLR.push(num);
                        }
                        else {
                            numsLRNeg.push(num);
                        }
                    }
                    var deferreds2 = me.sectionAnnihilate(numsLR, numsLRNeg);

                    // After everything has finished annihilating, rack up the remaining nums
                    $.when.apply($, deferreds2).then(function() {
                        // Rack the L/R nums
                        var numsLRRack = numsLR;
                        var sign = 1;
                        if (numsLRNeg.length) {
                            numsLRRack = numsLRNeg;
                            sign = -1;
                        }
                        var valueLR = numsLRRack.length;
                        me.sectionRack(numsLRRack, me.getNumPosLeft);

                        // Rack the answer nums
                        var numsARack, answer;
                        if (me.activeNumsA.length) {
                            numsARack = me.activeNumsA;
                            answer = numsARack.length;
                        }
                        else {
                            numsARack = me.activeNumsANeg;
                            answer = -1 * numsARack.length;
                        }
                        me.sectionRack(numsARack, me.getNumPosAnswer);

                        // Change the UI to the final mode
                        me.buttonGo.display = false;
                        me.textLeft.text = '';
                        me.textSign.text = sign * valueLR;
                        me.textRight.text = '';

                        // If the question was correct or there was no question
                        if ((me.getQuestion() === null) || ((me.getQuestion() !== null) && (answer === me.getQuestion().getAnswer()))) {
                            // Set the timeEnd on the question if there is a question
                            if (me.getQuestion() !== null) {
                                me.getQuestion().set('timeEnd', new Date().getTime());
                                if (typeof me.questions.localStorage !== 'undefined') {
                                    me.getQuestion().save();
                                }

                                // Show the next button
                                me.buttonNext.display = true;
                            }
                            else {
                                // Show the again button
                                me.buttonAgain.display = true;
                            }

                            // And show a check
                            me.entityAdd(new Check(me.textSign.x + 64, me.textSign.y - 32));
                            me.entityAdd(new Check(me.textAnswer.x + 64, me.textAnswer.y - 32));
                        }
                        // Otherwise show an X!
                        else if (me.getQuestion() !== null) {
                            me.entityAdd(new X(me.textAnswer.x + 64, me.textAnswer.y - 32));
                            me.buttonAgain.display = true;
                        }
                    });
                });
            };
        };

        // Next button click event
        Play.prototype.clickNext = function() {
            var me = this;
            return function(event) {
                this.engine.scenes[this.name] = new Play(this.engine, this.questions, this.getQuestionIdNext());
                this.engine.changeScenes(this.name);
            };
        };

        // Again button click event
        Play.prototype.clickAgain = function() {
            var me = this;
            return function(event) {
                me.reset();
            };
        };

        // Rack up the given nums at the location given by the function getNumPos(index)
        // Return the total number of racked nums
        Play.prototype.sectionRack = function(nums, getNumPos) {
            // Add up remaining positives or negatives
            var answer = 0;
            var me = this;
            nums.forEach(function(entity) {
                // Get the right location to rack up at
                var coords = {};
                coords = getNumPos.call(me, answer++);

                entity.spriteAnimateStop();
                entity.componentAdd(new Tween(entity, coords.x, coords.y, 20));
            });

            return answer;
        };

        // Annihilate extra pos/neg nums in a section
        // Returns deferreds for each animation
        Play.prototype.sectionAnnihilate = function(nums, numsNeg) {
            var deferreds = [];
            while (nums.length && numsNeg.length) {
                var deferred = new $.Deferred();
                var entity1 = nums.pop();
                var entity2 = numsNeg.pop();
                this.numAnnihilate(entity1, entity2, deferred);
                deferreds.push(deferred);
            }

            return deferreds;
        };

        // Annilate 2 given nums, and resolve deferred on complete
        Play.prototype.numAnnihilate = function(entity1, entity2, deferred) {
            var midpoint = Scene.getMidpoint(entity1, entity2);
            entity1.value = 0;
            entity2.value = 0;
            entity1.componentAdd(new Tween(entity1, midpoint.x, midpoint.y, 20, this.numAnnihilateAnimate(deferred)));
            entity2.componentAdd(new Tween(entity2, midpoint.x, midpoint.y, 20, this.numAnnihilateFinish()));
        };

        // When nums collide
        Play.prototype.numAnnihilateFinish = function(deferred) {
            var me = this;
            return function(event, entity) {
                entity.display = false;
                me.entityRemove(entity);
                if (typeof deferred !== 'undefined') {
                    deferred.resolve();
                }
            };
        };
        Play.prototype.numAnnihilateAnimate = function(deferred) {
            var me = this;
            return function(event, entity) {
                entity.spriteAnimate('annihilate', 1, me.numAnnihilateFinish(deferred));
            };
        };

        // Menu button click event
        Play.prototype.clickMenu = function() {
            var me = this;
            return function(event) {
                me.engine.changeScenes('Menu', require('menu'));
            };
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
                    if ('value' in entity) {
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
                    if ('value' in entity) {
                        count += entity.value;
                    }
                }
            });

            return count;
        };

        // Count the numbers in the answer side of the equation
        Play.prototype.getAnswerCount = function(ctx) {
            var count = 0;
            var me = this;
            this.entities.forEach(function(entity) {
                if ((entity.x > 2 * ctx.canvas.width / 3) && (entity.x < ctx.canvas.width)) {
                    if ('value' in entity) {
                        count += entity.value;
                    }
                }
            });

            return count;
        };

        // Change the UI to review mode, for when an answer has been submitted
        Play.prototype.modeChangeReview = function() {
            this.modePlay = false;
            this.buttonGo.display = false;
            this.textLeft.text = '';
            this.textSign.text = '';
            this.textRight.text = '';

            // Inactivate nums so the user can no longer move/create stuff
            this.numsInactivate();
        };

        // Inactivate all nums so the user can't keep playing around
        Play.prototype.numsInactivate = function() {
            // Inactivate all toolbar nums, so they no longer can create new nums
            this.toolbarNumL.componentRemove(DragCreate);
            this.toolbarNumR.componentRemove(DragCreate);
            this.toolbarNumA.componentRemove(DragCreate);
            this.toolbarNumNegL.componentRemove(DragCreate);
            this.toolbarNumNegR.componentRemove(DragCreate);
            this.toolbarNumNegA.componentRemove(DragCreate);

            // Inactivate all active nums
            this.entitiesRemoveComponents(this.activeNumsL, Draggable);
            this.entitiesRemoveComponents(this.activeNumsR, Draggable);
            this.entitiesRemoveComponents(this.activeNumsA, Draggable);
            this.entitiesRemoveComponents(this.activeNumsNegL, Draggable);
            this.entitiesRemoveComponents(this.activeNumsNegR, Draggable);
            this.entitiesRemoveComponents(this.activeNumsNegA, Draggable);
        };

        // Remove the give component type from all entities given in an array
        Play.prototype.entitiesRemoveComponents = function(entities, Component) {
            this.entities.forEach(function(entity) {
                entity.componentRemove(Component);
            });
        };

        // Get the current active question, or null if no questions
        Play.prototype.getQuestion = function() {
            if (this.questions.length === 0) {
                return null;
            }
            else {
                return this.questions.get(this.questionId);
            }
        };

        // Get the next preset question id in the list, or null if none
        Play.prototype.getQuestionIdNext = function() {
            var qNext = this.questions.at(this.questions.indexOf(this.getQuestion()) + 1);
            if (typeof qNext !== 'undefined' && qNext !== null && qNext.get('preset')) {
                return qNext.get('id');
            }
            else {
                return null;
            }
        };

        // Remove the given num from any activeNum arrays it belongs to
        Play.prototype.removeActiveNum = function(num) {
            this.removeFromArray(num, this.activeNumsL);
            this.removeFromArray(num, this.activeNumsLNeg);
            this.removeFromArray(num, this.activeNumsR);
            this.removeFromArray(num, this.activeNumsRNeg);
            this.removeFromArray(num, this.activeNumsA);
            this.removeFromArray(num, this.activeNumsANeg);
        };

        // Remove the given object from the given array, if it exists
        Play.prototype.removeFromArray = function(num, array) {
            var index = array.indexOf(num);
            if (index > -1) {
                array.splice(index, 1);
            }
        };

        // Reset the current scene
        Scene.prototype.reset = function() {
            this.engine.scenes[this.name] = new Play(this.engine);
            this.engine.changeScenes(this.name);
        };


        return Play;

    })();
});
