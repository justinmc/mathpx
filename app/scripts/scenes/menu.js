/*
    Scene: Menu
    The first, main menu
*/
/*global define */
define(['jquery', 'scene', 'play', 'menuChallenges', 'about', 'sprite', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack'], function ($, Scene, Play, MenuChallenges, About, Sprite, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack) {
    'use strict';

    return (function() {
        Scene.extend(Menu);

        Menu.prototype.name = 'Menu';
        Menu.prototype.route = 'main';

        function Menu(engine) {
            Menu.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkHouse(740, 100));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 20, 70, 300, 'Main Menu'));

            // Create the buttons
            this.entityAdd(new ButtonPx(centerX, 120, 'Challenges', this.clickChallenges()));
            this.entityAdd(new ButtonPx(centerX, 200, 'Free Play', this.clickFree()));
            this.entityAdd(new ButtonPx(centerX, 280, 'About Mathpx', this.clickAbout()));
        }

        Menu.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Menu.__super__.render.call(this, ctx, dt);
        };

        // Free Play button click event
        Menu.prototype.clickFree = function() {
            var me = this;
            return function(event) {
                me.engine.changeScenes('Play', Play);
            };
        };

        // Addition button click event
        Menu.prototype.clickChallenges = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes('MenuChallenges', MenuChallenges);
            };
        };

        // About button click event
        Menu.prototype.clickAbout = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes('About', About);
            };
        };

        // Back button click event
        Menu.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes('Start', require('start'));
            };
        };

        return Menu;

    })();
});
