/*
    Scene: MenuChallengesQuestionsSubNeg Challenges
*/
/*global define */
define(['jquery', 'menuChallengesQuestions', 'playSubNeg', 'questions'], function ($, MenuChallengesQuestions, PlaySubNeg, Questions) {
    'use strict';

    return (function() {
        MenuChallengesQuestions.extend(MenuChallengesQuestionsSubNeg);

        MenuChallengesQuestionsSubNeg.prototype.name = 'MenuChallengesQuestionsSubNeg';
        MenuChallengesQuestionsSubNeg.prototype.route = 'challenges/subneg';

        MenuChallengesQuestionsSubNeg.prototype.title = 'Subtraction with Negatives';

        function MenuChallengesQuestionsSubNeg(engine, title, questions) {
            // Create the collection of problems
            this.questions = new Questions('questionsSubtractionNeg');
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.questions.create({numL: '-1', numR: '-1', preset: true});
                this.questions.create({numL: '-2', numR: '-2', preset: true});
                this.questions.create({numL: '-3', numR: '-2', preset: true});
                this.questions.create({numL: '-4', numR: '-1', preset: true});
                this.questions.create({numL: '-4', numR: '-2', preset: true});
                this.questions.create({numL: '-5', numR: '-1', preset: true});
                this.questions.create({numL: '-3', numR: '3', preset: true});
                this.questions.create({numL: '-6', numR: '4', preset: true});
            }

            MenuChallengesQuestionsSubNeg.__super__.constructor.call(this, engine);
        }

        // Click on a problem event
        MenuChallengesQuestionsSubNeg.prototype.clickQuestion = function(index) {
            return function(index) {
                this.engine.sceneAdd(new PlaySubNeg(this.engine, this.questions, index), 'PlaySubNeg');
                this.engine.changeScenes('PlaySubNeg');
            }.bind(this, index);
        };

        return MenuChallengesQuestionsSubNeg;

    })();
});
