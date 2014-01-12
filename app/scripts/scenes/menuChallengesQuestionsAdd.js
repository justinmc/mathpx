/*
    Scene: MenuChallengesQuestionsAdd Challenges
    The challenge question selection menu
*/
/*global define */
define(["jquery", "scene", "menuChallengesQuestions", "playAdd", "sprite", "chalkTTT", "text", "button", "buttonBack", "checkStatic", "questions"], function ($, Scene, MenuChallengesQuestions, PlayAdd, Sprite, ChalkTTT, Text, Button, ButtonBack, CheckStatic, Questions) {
    "use strict";

    return (function() {
        MenuChallengesQuestions.extend(MenuChallengesQuestionsAdd);

        MenuChallengesQuestionsAdd.prototype.name = "MenuChallengesQuestionsAdd";
        MenuChallengesQuestionsAdd.prototype.route = "challenges/add";

        MenuChallengesQuestionsAdd.prototype.title = "Simple Addition";

        function MenuChallengesQuestionsAdd(engine, title, questions) {
            MenuChallengesQuestionsAdd.__super__.constructor.call(this, engine);

            // Create the collection of problems
            this.questions = new Questions('questionsAddition');
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
        }

        return MenuChallengesQuestionsAdd;

    })();
});
