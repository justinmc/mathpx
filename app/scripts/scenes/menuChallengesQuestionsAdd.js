/*
    Scene: MenuChallengesQuestionsAdd Challenges
    The challenge question selection menu
*/
/*global define */
define(['jquery', 'menuChallengesQuestions', 'playAdd', 'chalkTTT', 'checkStatic', 'questions'], function ($, MenuChallengesQuestions, PlayAdd, ChalkTTT, CheckStatic, Questions) {
    'use strict';

    return (function() {
        MenuChallengesQuestions.extend(MenuChallengesQuestionsAdd);

        MenuChallengesQuestionsAdd.prototype.name = 'MenuChallengesQuestionsAdd';
        MenuChallengesQuestionsAdd.prototype.route = 'challenges/add';

        MenuChallengesQuestionsAdd.prototype.title = 'Simple Addition';

        MenuChallengesQuestionsAdd.prototype.Type = MenuChallengesQuestionsAdd;

        function MenuChallengesQuestionsAdd(engine, title, questions) {
            // Create the collection of problems
            this.questions = new Questions('questionsAddition');
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.questions.create({numL: '1', numR: '1', preset: true});
                this.questions.create({numL: '2', numR: '2', preset: true});
                this.questions.create({numL: '3', numR: '2', preset: true});
                this.questions.create({numL: '2', numR: '3', preset: true});
                this.questions.create({numL: '1', numR: '4', preset: true});
                this.questions.create({numL: '5', numR: '1', preset: true});
                this.questions.create({numL: '2', numR: '0', preset: true});
                this.questions.create({numL: '3', numR: '3', preset: true});
            }

            MenuChallengesQuestionsAdd.__super__.constructor.call(this, engine);
        }

        return MenuChallengesQuestionsAdd;

    })();
});
