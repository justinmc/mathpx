/*
    Scene: MenuChallengesQuestionsAddQuiz Challenges
    The challenge question selection menu, quiz questions
*/
/*global define */
define(['jquery', 'menuChallengesQuestions', 'playAdd', 'chalkTTT', 'checkStatic', 'questions'], function ($, MenuChallengesQuestions, PlayAdd, ChalkTTT, CheckStatic, Questions) {
    'use strict';

    return (function() {
        MenuChallengesQuestions.extend(MenuChallengesQuestionsAddQuiz);

        MenuChallengesQuestionsAddQuiz.prototype.name = 'MenuChallengesQuestionsAddQuiz';
        MenuChallengesQuestionsAddQuiz.prototype.route = 'challenges/add/quiz';

        MenuChallengesQuestionsAddQuiz.prototype.title = 'Simple Addition';

        function MenuChallengesQuestionsAddQuiz(engine, title, questions) {
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

            MenuChallengesQuestionsAddQuiz.__super__.constructor.call(this, engine);
        }

        return MenuChallengesQuestionsAddQuiz;

    })();
});
