/*
    Scene: Menu
    The first, main menu
*/
/*global define */
define(["jquery", "scene", "sprite", "startChalk", "text", "button"], function ($, Scene, Sprite, MenuChalk, Text, Button) {
    "use strict";

    return (function() {
        Scene.extend(Menu);

        Menu.prototype.name = "Menu";
        Menu.prototype.route = "main";

        function Menu(engine) {
            Menu.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $("img.gettable.gettable-chalkboard-bg").attr("src");
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new MenuChalk(100, 180));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new Button(50, 40, 60, 40, "<-", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickBack(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Text(700, 70, 0, "Math Pix!", "20px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create the buttons
            this.entityAdd(new Button(centerX, 120, 190, 40, "Challenges", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickChallenges(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Button(centerX, 200, 190, 40, "Free Play", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickFree(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Button(centerX, 280, 190, 40, "About Math Pix", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickAbout(), 16, "rgb(255, 255, 255)"));
        }

        Menu.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Menu.__super__.render.call(this, ctx, dt);
        };

        Menu.prototype.click = function(event) {
            var coords = this.getEventCoords(event);
            console.log("click at " + coords.x + ", " + coords.y);
        };

        // Free Play button click event
        Menu.prototype.clickFree = function() {
            var me = this;
            return function(event) {
                me.engine.changeScenes("Play");
            };
        };

        // Addition button click event
        Menu.prototype.clickChallenges = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("MenuChallenges");
            };
        };

        // About button click event
        Menu.prototype.clickAbout = function(event) {
            return function() {
                console.log("clicked about");
            };
        };

        // Back button click event
        Menu.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes("Start");
            };
        };

        return Menu;

    })();
});
