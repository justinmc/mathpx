/*
    Scene: MenuChallenges Challenges
    The math type selection menu
*/
/*global define */
define(["jquery", "questions", "scene", "menuChallengesQuestions", "menuChallengesQuestionsAdd", "sprite", "startChalk", "text", "button", "buttonBack"], function ($, Questions, Scene, MenuChallengesQuestions, menuChallengesQuestionsAdd, Sprite, MenuChalk, Text, Button, ButtonBack) {
    "use strict";

    return (function() {
        Scene.extend(MenuChallenges);

        MenuChallenges.prototype.name = "MenuChallenges";
        MenuChallenges.prototype.route = "challenges";

        MenuChallenges.prototype.colorText = "rgb(255, 255, 255)";

        function MenuChallenges(engine) {
            MenuChallenges.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $("img.gettable.gettable-chalkboard-bg").attr("src");
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new MenuChalk(100, 180));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new Text(700, 70, 0, "Math Pix!", "20px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.entityAdd(new Text(centerX - 30, 70, 0, "Challenges", "28px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create the buttons
            this.entityAdd(new Button(centerX, 120, 190, 40, "Simple Addition", "20px 'Press Start 2P'", this.colorText, this.clickAddition(), 16, this.colorText));
            this.entityAdd(new Button(centerX, 200, 190, 40, "Simple Subtraction", "20px 'Press Start 2P'", this.colorText, this.clickSubtraction(), 16, this.colorText));
            this.entityAdd(new Button(centerX, 280, 190, 40, "Addition with Negatives", "20px 'Press Start 2P'", this.colorText, this.clickAdditionNeg(), 16, this.colorText));
            this.entityAdd(new Button(centerX, 360, 190, 40, "Subtraction with Negatives", "20px 'Press Start 2P'", this.colorText, this.clickSubtractionNeg(), 16, this.colorText));
        }

        MenuChallenges.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            MenuChallenges.__super__.render.call(this, ctx, dt);
        };

        // Addition button click event
        MenuChallenges.prototype.clickAddition = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("MenuChallengesQuestionsAdd", MenuChallengesQuestionsAdd);
            };
        };

        // Subtraction button click event
        MenuChallenges.prototype.clickSubtraction = function(event) {
            var me = this;
            return function(event) {
                console.log('wut wut');
                // Create the collection of problems
                var questions = new Questions('questionsSubtraction');
                questions.fetch();
                if (!questions.length) {
                    questions.reset();
                    questions.create({numL: "8", numR: "-1", preset: true});
                    questions.create({numL: "2", numR: "-2", preset: true});
                    questions.create({numL: "3", numR: "-2", preset: true});
                    questions.create({numL: "2", numR: "-3", preset: true});
                    questions.create({numL: "1", numR: "-4", preset: true});
                    questions.create({numL: "5", numR: "-1", preset: true});
                    questions.create({numL: "3", numR: "-3", preset: true});
                    questions.create({numL: "6", numR: "-4", preset: true});
                }

                // Change Scenes
                me.engine.scenes["MenuChallengesQuestions"] = new MenuChallengesQuestions(me.engine, 'Simple Subtraction', questions);
                me.engine.changeScenes("MenuChallengesQuestions");
            };
        };

        // Addition Neg button click event
        MenuChallenges.prototype.clickAdditionNeg = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlayAddNeg");
            };
        };

        // Subtraction Neg button click event
        MenuChallenges.prototype.clickSubtractionNeg = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes("PlaySubNeg");
            };
        };

        // About button click event
        MenuChallenges.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes("Menu", require("menu"));
            };
        };

        return MenuChallenges;

    })();
});
