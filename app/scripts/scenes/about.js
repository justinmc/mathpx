/*
    Scene: About
    About page!
*/
/*global define */
define(['jquery', 'scene', 'play', 'menuChallenges', 'sprite', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack'], function ($, Scene, Play, AboutChallenges, Sprite, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack) {
    'use strict';

    return (function() {
        Scene.extend(About);

        About.prototype.name = 'About';
        About.prototype.route = 'about';

        function About(engine) {
            About.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 10, 70, 300, 'About'));

            var p1 = 'Mathpx is an experiment with the goal of teaching kids in an afternoon what the school systems take years to teach.  By using game-like exploratory methods of learning in the place of memorization and testing, players will go from 1 + 1 to addition and subtraction of negatives at their own pace.';
            var line = 50;
            this.entityAdd(new TextPx(60, 130, 830, p1.substr(0, line), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(60, 165, 830, p1.substr(line,  line), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(60, 200, 830, p1.substr(2 * line, line), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(60, 235, 830, p1.substr(3 * line, line), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(60, 270, 830, p1.substr(4 * line, line), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(60, 305, 830, p1.substr(5 * line, line), '18px \'Press Start 2P\''));
            this.entityAdd(new TextPx(90, 400, 400, 'Author: Justin McCandless', '18px \'Press Start 2P\''));

            // Create the buttons
            this.entityAdd(new ButtonPx(600, 375, 'justinmccandless.com ->', this.clickAbout()));
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
                console.log('clicked about');
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
