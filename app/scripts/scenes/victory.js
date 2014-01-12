/*
    Scene: Victory
    Shown after all problems completed
*/
/*global define */
define(["jquery", "scene", "menu", "play", "menuChallenges", "sprite", "startChalk", "text", "button", "buttonBack"], function ($, Scene, Menu, Play, MenuChallenges, Sprite, MenuChalk, Text, Button, ButtonBack) {
    "use strict";

    return (function() {
        Scene.extend(Victory);

        Victory.prototype.name = "Victory";
        Victory.prototype.route = "victory";

        Victory.prototype.nameSection = "";
        Victory.prototype.nameMenu = "Menu";
        Victory.prototype.TypeMenu = Menu;

        function Victory(engine, nameSection, nameMenu, TypeMenu) {
            Victory.__super__.constructor.call(this, engine);

            // Get the parameters
            if (typeof nameSection !== "undefine" && nameSection !== null && nameSection !== "") {
                this.nameSection = nameSection;
            }
            if (typeof nameMenu !== "undefine" && nameMenu !== null && nameMenu !== "") {
                this.nameMenu = "Menu";
            }

            // Create the background image
            var spriteImage = $("img.gettable.gettable-chalkboard-bg").attr("src");
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new MenuChalk(100, 180));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new Text(700, 70, 0, "Math Pix!", "20px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.entityAdd(new Text(centerX - 80, 70, 0, this.nameSection, "28px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.entityAdd(new Text(centerX - 120, 140, 0, "CHALLENGE COMPLETE!", "28px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create the buttons
            this.entityAdd(new Button(centerX, 220, 190, 40, "Challenges", "20px 'Press Start 2P'", "rgb(255, 255, 255)", this.clickChallenges(), 16, "rgb(255, 255, 255)"));
        }

        Victory.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Victory.__super__.render.call(this, ctx, dt);
        };

        // Back to menu button
        Victory.prototype.clickBack = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("MenuChallengesQuestionsAdd", require("menuChallengesQuestionsAdd"));
            };
        };

        // Back button click event
        Victory.prototype.clickChallenges = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes("MenuChallenges", require("menuChallenges"));
            };
        };

        return Victory;

    })();
});
