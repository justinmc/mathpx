/*
    Scene: MenuChallengesQuestions Challenges
    The challenge question selection menu
*/
/*global define */
define(['jquery', 'scene', 'playAdd', 'sprite', 'chalkTTT', 'text', 'button', 'buttonBack', 'checkStatic', 'questions'], function ($, Scene, PlayAdd, Sprite, ChalkTTT, Text, Button, ButtonBack, CheckStatic, Questions) {
    'use strict';

    return (function() {
        Scene.extend(MenuChallengesQuestions);

        MenuChallengesQuestions.prototype.name = 'MenuChallengesQuestions';

        MenuChallengesQuestions.prototype.colorText = 'rgb(255, 255, 255)';

        MenuChallengesQuestions.prototype.questions = null;

        function MenuChallengesQuestions(engine, title) {
            MenuChallengesQuestions.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk animation!
            this.entityAdd(new ChalkTTT(550, 340));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new Text(700, 70, 0, 'Math Pix!', '20px \'Press Start 2P\'', 'rgb(255, 255, 255)'));
            this.entityAdd(new Text(centerX - 120, 130, 0, this.title, '26px \'Press Start 2P\'', 'rgb(255, 255, 255)'));

            // Create the buttons
            var me = this;
            this.questions.where({preset: true}).forEach(function(question, i) {
                // Get the button text, question mark for unplayed, problem for played
                var problem = '?';
                if (question.has('timeStart')) {
                    var numR = ' + ' + question.get('numR');
                    if (question.get('numR') < 0) {
                        numR = ' - ' + Math.abs(question.get('numR'));
                    }
                    problem = question.get('numL') + numR;
                }

                // Get the position of the button
                var x = 200 + 160 * (i % 4);
                var y = 200 + 60 * Math.floor(i / 4);

                // Add the button
                me.entityAdd(new Button(x, y, 100, 40, problem, '20px \'Press Start 2P\'', me.colorText, me.clickQuestion(question.get('id')), 16, me.colorText));

                // Add a check if the question is complete
                if (question.has('timeEnd')) {
                    me.entityAdd(new CheckStatic(x + 85, y - 25));
                }
            });
        }

        MenuChallengesQuestions.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            MenuChallengesQuestions.__super__.render.call(this, ctx, dt);
        };

        // Click on a problem event
        MenuChallengesQuestions.prototype.clickQuestion = function(index) {
            return function(index) {
                this.engine.sceneAdd(new PlayAdd(this.engine, this.questions, index), 'PlayAdd');
                this.engine.changeScenes('PlayAdd');
            }.bind(this, index);
        };

        // Back button click event
        MenuChallengesQuestions.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes('MenuChallenges', require('menuChallenges'));
            };
        };

        return MenuChallengesQuestions;

    })();
});
