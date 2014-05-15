/*
    Scene: Parents
    Feedback page for parents
*/
/*global define */
define(['jquery', 'play', 'menuChallenges', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack', 'graph', 'questions'], function ($, Play, AboutChallenges, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack, Graph, Questions) {
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
            this.entityAdd(new hoopty.entities.TextMultiline(60, 125, 830, p1, '18px \'Press Start 2P\'', 'rgb(255, 255, 255)', 50));

            // Get the data
            var questions = new Questions('questionsLearning');
            questions.fetch();
            var scores = questions.getScores();

            // Create the feedback text
            console.log(scores);
            this.entityAdd(new TextPx(90, 195, 150, 'Simple Addition: ', '18px \'Press Start 2P\'', 'rgb(190, 190, 227)'));
            this.entityAdd(new hoopty.entities.TextMultiline(240, 195, 620, this.getStatusText(scores.posPos, scores.posPosQ), '14px \'Press Start 2P\'', 'rgb(255, 255, 255)', 60, 20));
            this.entityAdd(new TextPx(90, 265, 150, 'Simple Subtraction: ', '18px \'Press Start 2P\'', 'rgb(190, 190, 227)'));
            this.entityAdd(new hoopty.entities.TextMultiline(240, 265, 620, this.getStatusText(scores.posNeg, scores.posNegQ), '14px \'Press Start 2P\'', 'rgb(255, 255, 255)', 60, 20));
            this.entityAdd(new TextPx(90, 335, 150, 'Addition with Negatives: ', '18px \'Press Start 2P\'', 'rgb(190, 190, 227)'));
            this.entityAdd(new hoopty.entities.TextMultiline(240, 335, 620, this.getStatusText(scores.negPos, scores.negPosQ), '14px \'Press Start 2P\'', 'rgb(255, 255, 255)', 60, 20));
            this.entityAdd(new TextPx(90, 405, 150, 'Subtraction with Negatives: ', '18px \'Press Start 2P\'', 'rgb(190, 190, 227)'));
            this.entityAdd(new hoopty.entities.TextMultiline(240, 405, 620, this.getStatusText(scores.negNeg, scores.negNegQ), '14px \'Press Start 2P\'', 'rgb(255, 255, 255)', 60, 20));

            // Create the graphs
            this.entityAdd(new Graph(60, 184, scores.posPos + scores.posPosQ));
            this.entityAdd(new Graph(60, 254, scores.posNeg + scores.posNegQ));
            this.entityAdd(new Graph(60, 324, scores.negPos + scores.negPosQ));
            this.entityAdd(new Graph(60, 394, scores.negNeg + scores.negNegQ));
        }

        Parents.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Parents.__super__.render.call(this, ctx, dt);
        };

        // Get a string describing the player's status
        Parents.prototype.getStatusText = function(score, scoreQ) {
            if (score === null) {
                return 'Your child hasn\'t attempted any of these yet.';
            }
            else if (score >= 6 && scoreQ === null) {
                return 'Your child is doing very well with visual problems. You should encourage him or her to try some written problems.';
            }
            else if (score && scoreQ === null) {
                return 'Your child is progressing well using visual problems.';
            }
            else if (score && scoreQ >= 6) {
                return 'Your child is doing very well in both visual and written problems. You could try more advanced problems with him or her in Free Play or outside of Mathpx.';
            }
            else if (score && !scoreQ) {
                return 'Your child is understanding the visual problems but not the written ones. You should work with him or her to make the connection between the two.';
            }
            else {
                return 'Your child has missed a few of these problems and might need help figuring out how the visual game works here.';
            }
        };

        // Back button click event
        Parents.prototype.clickBack = function(event) {
            this.engine.changeScenes('Menu', require('menu'));
        };

        return Parents;

    })();
});
