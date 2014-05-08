/*
    Scene: Menu
    The first, main menu
*/
/*global define */
define(['jquery', 'play', 'menuChallenges', 'menuLearning', 'about', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack'], function ($, Play, MenuChallenges, MenuLearning, About, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(Menu);

        Menu.prototype.name = 'Menu';
        Menu.prototype.route = 'main';

        function Menu(engine) {
            Menu.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkHouse(740, 100));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack.bind(this)));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 20, 70, 300, 'Main Menu'));

            // Create the buttons
            this.entityAdd(new ButtonPx(centerX, 120, 'Learning', this.clickLearning.bind(this)));
            this.entityAdd(new ButtonPx(centerX, 200, 'Challenges', this.clickChallenges.bind(this)));
            this.entityAdd(new ButtonPx(centerX, 280, 'Free Play', this.clickFree.bind(this)));
            this.entityAdd(new ButtonPx(centerX, 360, 'About Mathpx', this.clickAbout.bind(this)));
        }

        Menu.prototype.render = function(ctx, dt) {
            Menu.__super__.render.call(this, ctx, dt);
        };

        // Free Play button click event
        Menu.prototype.clickFree = function() {
            this.engine.changeScenes('Play', Play);
        };

        // Clicking the Learning button
        Menu.prototype.clickLearning = function(event) {
            this.engine.changeScenes('MenuLearning', MenuLearning);
        };

        // Challenges button click
        Menu.prototype.clickChallenges = function(event) {
            this.engine.changeScenes('MenuChallenges', MenuChallenges);
        };

        // About button click
        Menu.prototype.clickAbout = function(event) {
            this.engine.changeScenes('About', About);
        };

        // Back button click
        Menu.prototype.clickBack = function(event) {
            this.engine.changeScenes('Start', require('start'));
        };

        return Menu;

    })();
});
