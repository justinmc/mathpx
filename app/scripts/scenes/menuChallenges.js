/*
    Scene: MenuChallenges Challenges
    The math type selection menu
*/
/*global define */
define(['jquery', 'questions', 'menuChallengesQuestions', 'menuChallengesQuestionsAdd', 'menuChallengesQuestionsSub', 'menuChallengesQuestionsAddNeg', 'menuChallengesQuestionsSubNeg', 'startChalk', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack'], function ($, Questions, MenuChallengesQuestions, MenuChallengesQuestionsAdd, MenuChallengesQuestionsSub, MenuChallengesQuestionsAddNeg, MenuChallengesQuestionsSubNeg, MenuChalk, TextPx, TextPxTitle, ButtonPx, ButtonBack) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(MenuChallenges);

        MenuChallenges.prototype.name = 'MenuChallenges';
        MenuChallenges.prototype.route = 'challenges';

        MenuChallenges.prototype.colorText = 'rgb(255, 255, 255)';

        function MenuChallenges(engine) {
            MenuChallenges.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new MenuChalk(100, 180));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 30, 70, 400, 'Challenges', '28px \'Press Start 2P\''));

            // Create the buttons
            this.entityAdd(new ButtonPx(centerX, 120, 'Simple Addition', this.clickAddition()));
            this.entityAdd(new ButtonPx(centerX, 200, 'Simple Subtraction', this.clickSubtraction()));
            this.entityAdd(new ButtonPx(centerX, 280, 'Addition with Negatives', this.clickAdditionNeg()));
            this.entityAdd(new ButtonPx(centerX, 360, 'Subtraction with Negatives', this.clickSubtractionNeg()));
        }

        MenuChallenges.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            MenuChallenges.__super__.render.call(this, ctx, dt);
        };

        // Addition button click event
        MenuChallenges.prototype.clickAddition = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes('MenuChallengesQuestionsAdd', MenuChallengesQuestionsAdd);
            };
        };

        // Subtraction button click event
        MenuChallenges.prototype.clickSubtraction = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes('MenuChallengesQuestionsSub', MenuChallengesQuestionsSub);
            };
        };

        // Addition Neg button click event
        MenuChallenges.prototype.clickAdditionNeg = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes('MenuChallengesQuestionsAddNeg', MenuChallengesQuestionsAddNeg);
            };
        };

        // Subtraction Neg button click event
        MenuChallenges.prototype.clickSubtractionNeg = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes('MenuChallengesQuestionsSubNeg', MenuChallengesQuestionsSubNeg);
            };
        };

        // About button click event
        MenuChallenges.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes('Menu', require('menu'));
            };
        };

        return MenuChallenges;

    })();
});
