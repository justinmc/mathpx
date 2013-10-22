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

        function Menu(engine) {
            Menu.__super__.constructor.call(this, engine);

            // Create the background image
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, $("img.gettable.gettable-chalkboard").attr("src"), 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new MenuChalk(100, 80));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new Text(centerX, 90, 0, "Math Pix!", "32px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create the buttons
            this.entityAdd(new Button(centerX, 120, 190, 40, "Simple Addition", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickAddition(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Button(centerX, 200, 190, 40, "Simple Subtraction", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickSubtraction(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Button(centerX, 280, 190, 40, "Free Play!", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickFree(), 16, "rgb(255, 255, 255)"));
            this.entityAdd(new Button(centerX, 360, 190, 40, "About Math Pix", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickAbout(), 16, "rgb(255, 255, 255)"));
        }

        Menu.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Menu.__super__.render.call(this, ctx, dt);
        };

        // Free Play button click event
        Menu.prototype.clickFree = function() {
            var me = this;
            return function(event) {
                me.engine.changeScenes("Play");
            };
        };

        // Addition button click event
        Menu.prototype.clickAddition = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlayAdd");
            };
        };

        // Subtraction button click event
        Menu.prototype.clickSubtraction = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlaySub");
            };
        };

        // About button click event
        Menu.prototype.clickAbout = function(event) {
            return function() {
                console.log("clicked about");
            };
        };

        return Menu;

    })();
});
