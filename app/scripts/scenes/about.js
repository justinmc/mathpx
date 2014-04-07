/*
    Scene: About
    About page!
*/
/*global define */
define(['jquery', 'play', 'menuChallenges', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack'], function ($, Play, AboutChallenges, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(About);

        About.prototype.name = 'About';
        About.prototype.route = 'about';

        function About(engine) {
            About.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new TextPx(centerX - 10, 70, 300, 'About Mathpx'));

            // Create the text
            var p1 = 'Mathpx is an experiment with the goal of teaching kids in an afternoon what the school systems take years to teach.  By using game-like exploratory methods of learning in the place of memorization and testing, players will go from 1 + 1 to addition and subtraction of negatives at the pace of their own visual, deep understanding.';
            this.entityAdd(new hoopty.entities.TextMultiline(60, 125, 830, p1, '18px \'Press Start 2P\'', 'rgb(255, 255, 255)', 50));
            this.entityAdd(new TextPx(170, 380, 400, 'Author: Justin McCandless', '18px \'Press Start 2P\''));

            // Create the pic
            this.entityAdd(new hoopty.entities.Sprite(60, 320, 88, 101, $('img.gettable.gettable-portrait').attr('src'), 0, 0, 14, 16));

            // Create the buttons
            this.entityAdd(new ButtonPx(650, 355, 'justinmccandless.com ->', this.clickAbout()));
        }

        About.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            About.__super__.render.call(this, ctx, dt);
        };

        // About button click event
        About.prototype.clickAbout = function(event) {
            return function() {
                window.open('http://www.justinmccandless.com', '_blank');
            };
        };

        // Back button click event
        About.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes('Menu', require('menu'));
            };
        };

        return About;

    })();
});
