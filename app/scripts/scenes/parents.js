/*
    Scene: Parents
    Feedback page for parents
*/
/*global define */
define(['jquery', 'play', 'menuChallenges', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack', 'questions'], function ($, Play, AboutChallenges, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack, Questions) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(Parents);

        Parents.prototype.name = 'Parents';
        Parents.prototype.route = 'parents';

        function Parents(engine) {
            Parents.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack.bind(this)));
            this.entityAdd(new TextPx(centerX - 10, 70, 300, 'Hey Teacher!'));

            // Create the subtitle text
            var p1 = 'Here\'s some info on how your child is doing based on data gathered in Learning mode:';
            this.entityAdd(new hoopty.entities.TextMultiline(60, 140, 830, p1, '18px \'Press Start 2P\'', 'rgb(255, 255, 255)', 50));

            // Get the data
            var questions = new Questions('questionsLearning');
            questions.fetch();
            var statuses = questions.getStatuses();

            // Create the feedback text
            this.entityAdd(new TextPx(70, 250, 800, 'Simple Addition: ' + this.statusToText(statuses.posPos), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(70, 300, 800, 'Simple Subtraction: ' + this.statusToText(statuses.posNeg), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(70, 350, 800, 'Addition with Negatives: ' + this.statusToText(statuses.posNeg), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(70, 400, 800, 'Subtraction with Negatives: ' + this.statusToText(statuses.negNeg), '18px \'Press Start 2P\''));
        }

        Parents.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Parents.__super__.render.call(this, ctx, dt);
        };

        // Get a string describing the player's status
        Parents.prototype.statusToText = function(score) {
            if (score) {
                return 'Your child isn\'t bad.';
            }
            else {
                return 'Your child needs help.';
            }
        };

        // Back button click event
        Parents.prototype.clickBack = function(event) {
            this.engine.changeScenes('Menu', require('menu'));
        };

        return Parents;

    })();
});
