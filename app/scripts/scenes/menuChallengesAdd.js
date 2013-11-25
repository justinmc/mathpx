/*
    Scene: MenuChallengesAdd Challenges
    The math type selection menu
*/
/*global define */
define(["jquery", "scene", "sprite", "startChalk", "text", "button", "questions"], function ($, Scene, Sprite, MenuChallengesChalk, Text, Button, Questions) {
    "use strict";

    return (function() {
        Scene.extend(MenuChallengesAdd);

        MenuChallengesAdd.prototype.name = "MenuChallengesAdd";
        MenuChallengesAdd.prototype.route = "challenges/add";

        MenuChallengesAdd.prototype.colorText = "rgb(255, 255, 255)";

        MenuChallengesAdd.prototype.collectionQuestions = null;

        function MenuChallengesAdd(engine) {
            MenuChallengesAdd.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $("img.gettable.gettable-chalkboard-bg").attr("src");
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new MenuChallengesChalk(100, 80));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new Text(centerX, 90, 0, "Math Pix Simple Addition", "32px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create the collection of problems
            this.collectionQuestions = new Questions([
                {numL: "1", numR: "1"},
                {numL: "2", numR: "2"},
                {numL: "3", numR: "2"},
                {numL: "2", numR: "3"},
                {numL: "1", numR: "4"},
                {numL: "5", numR: "1"},
                {numL: "3", numR: "3"},
                {numL: "2", numR: "4"},
            ]); 

            // Create the buttons
            var me = this;
            this.collectionQuestions.forEach(function(question, i) {
                // Get the button text, question mark for unplayed, problem for played
                var problem = "?";
                if (question.get("start") !== null) {
                    question.get("numL") + " + " + question.get("numR");
                }

                // Get the position of the button
                var x = 30 + 60 * (i % 4);
                var y = 120 + 60 * Math.floor(i / 4);

                me.entityAdd(new Button(x, y, 100, 40, problem, "20px 'Press Start 2P'", me.colorText, function(){me.engine.changeScenes("Play", question)}, 16, me.colorText));
            });
        }

        MenuChallengesAdd.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            MenuChallengesAdd.__super__.render.call(this, ctx, dt);
        };

        // Addition button click event
        MenuChallengesAdd.prototype.clickAddition = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlayAdd");
            };
        };

        // Subtraction button click event
        MenuChallengesAdd.prototype.clickSubtraction = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlaySub");
            };
        };

        // Addition Neg button click event
        MenuChallengesAdd.prototype.clickAdditionNeg = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlayAddNeg");
            };
        };

        // Subtraction Neg button click event
        MenuChallengesAdd.prototype.clickSubtractionNeg = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlaySubNeg");
            };
        };

        // About button click event
        MenuChallengesAdd.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes("Menu");
            };
        };

        return MenuChallengesAdd;

    })();
});
