/*
    Scene: MenuChallengesQuestionsAddNeg Challenges
*/
/*global define */
define(['jquery', 'menuChallengesQuestions', 'playAddNeg', 'questions'], function ($, MenuChallengesQuestions, PlayAddNeg, Questions) {
    'use strict';

    return (function() {
        MenuChallengesQuestions.extend(MenuChallengesQuestionsAddNeg);

        MenuChallengesQuestionsAddNeg.prototype.name = 'MenuChallengesQuestionsAddNeg';
        MenuChallengesQuestionsAddNeg.prototype.route = 'challenges/addneg';

        MenuChallengesQuestionsAddNeg.prototype.title = 'Addition with Negatives';

        MenuChallengesQuestionsAddNeg.prototype.Type = MenuChallengesQuestionsAddNeg;

        function MenuChallengesQuestionsAddNeg(engine, title, questions) {
            // Create the collection of problems
            this.questions = new Questions('questionsAdditionNeg');
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.questions.create({numL: '-1', numR: '1', preset: true});
                this.questions.create({numL: '-2', numR: '2', preset: true});
                this.questions.create({numL: '-3', numR: '2', preset: true});
                this.questions.create({numL: '-2', numR: '3', preset: true});
                this.questions.create({numL: '-1', numR: '4', preset: true});
                this.questions.create({numL: '-5', numR: '1', preset: true});
                this.questions.create({numL: '-0', numR: '3', preset: true});
                this.questions.create({numL: '-2', numR: '4', preset: true});
            }

            MenuChallengesQuestionsAddNeg.__super__.constructor.call(this, engine);
        }

        // Click on a problem event
        MenuChallengesQuestionsAddNeg.prototype.clickQuestion = function(index) {
            return function(index) {
                this.engine.sceneAdd(new PlayAddNeg(this.engine, this.questions, index), 'PlayAddNeg');
                this.engine.changeScenes('PlayAddNeg');
            }.bind(this, index);
        };

        return MenuChallengesQuestionsAddNeg;

    })();
});
