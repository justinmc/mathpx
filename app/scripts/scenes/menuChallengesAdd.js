/*
    Scene: MenuChallengesAdd Challenges
    The math type selection menu
*/
/*global define */
define(["jquery", "scene", "playAdd", "sprite", "chalkTTT", "text", "button", "buttonBack", "checkStatic", "questions"], function ($, Scene, PlayAdd, Sprite, ChalkTTT, Text, Button, ButtonBack, CheckStatic, Questions) {
    "use strict";

    return (function() {
        Scene.extend(MenuChallengesAdd);

        MenuChallengesAdd.prototype.name = "MenuChallengesAdd";
        MenuChallengesAdd.prototype.route = "challenges/add";

        MenuChallengesAdd.prototype.colorText = "rgb(255, 255, 255)";

        MenuChallengesAdd.prototype.questions = null;

        function MenuChallengesAdd(engine) {
            MenuChallengesAdd.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $("img.gettable.gettable-chalkboard-bg").attr("src");
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkTTT(100, 180));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new Text(700, 70, 0, "Math Pix!", "20px 'Press Start 2P'", "rgb(255, 255, 255)"));
            this.entityAdd(new Text(centerX - 100, 70, 0, "Simple Addition", "28px 'Press Start 2P'", "rgb(255, 255, 255)"));

            // Create the collection of problems
            this.questions = new Questions();
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.questions.create({numL: "1", numR: "1", preset: true});
                this.questions.create({numL: "2", numR: "2", preset: true});
                this.questions.create({numL: "3", numR: "2", preset: true});
                this.questions.create({numL: "2", numR: "3", preset: true});
                this.questions.create({numL: "1", numR: "4", preset: true});
                this.questions.create({numL: "5", numR: "1", preset: true});
                this.questions.create({numL: "3", numR: "3", preset: true});
                this.questions.create({numL: "2", numR: "4", preset: true});
            }

            // Create the buttons
            var me = this;
            this.questions.where({preset: true}).forEach(function(question, i) {
                // Get the button text, question mark for unplayed, problem for played
                var problem = "?";
                if (question.has("timeStart")) {
                    problem = question.get("numL") + " + " + question.get("numR");
                }

                // Get the position of the button
                var x = 200 + 160 * (i % 4);
                var y = 200 + 60 * Math.floor(i / 4);

                // Add the button
                me.entityAdd(new Button(x, y, 100, 40, problem, "20px 'Press Start 2P'", me.colorText, me.clickQuestion(question.get("id")), 16, me.colorText));

                // Add a check if the question is complete
                if (question.has("timeEnd")) {
                    me.entityAdd(new CheckStatic(x + 85, y - 25));
                }
            });
        }

        MenuChallengesAdd.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            MenuChallengesAdd.__super__.render.call(this, ctx, dt);
        };

        // Click on a problem event
        MenuChallengesAdd.prototype.clickQuestion = function(index) {
            var me = this;
            return function() {
                me.engine.sceneAdd(new PlayAdd(me.engine, me.questions, index), "PlayAdd");
                me.engine.changeScenes("PlayAdd");
            };
        };

        // Back button click event
        MenuChallengesAdd.prototype.clickBack = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes("MenuChallenges", require("menuChallenges"));
            };
        };

        return MenuChallengesAdd;

    })();
});
