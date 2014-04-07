/*
    Scene: MenuChallengesQuestionsSub Challenges
    The challenge question selection menu
*/
/*global define */
define(['jquery', 'menuChallengesQuestions', 'playSub', 'chalkTTT', 'checkStatic', 'questions'], function ($, MenuChallengesQuestions, PlaySub, ChalkTTT, CheckStatic, Questions) {
    'use strict';

    return (function() {
        MenuChallengesQuestions.extend(MenuChallengesQuestionsSub);

        MenuChallengesQuestionsSub.prototype.name = 'MenuChallengesQuestionsSub';
        MenuChallengesQuestionsSub.prototype.route = 'challenges/sub';

        MenuChallengesQuestionsSub.prototype.title = 'Simple Subtraction';

        function MenuChallengesQuestionsSub(engine, title, questions) {
            // Create the collection of problems
            this.questions = new Questions('questionsSubtraction');
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.questions.create({numL: '1', numR: '-1', preset: true});
                this.questions.create({numL: '2', numR: '-2', preset: true});
                this.questions.create({numL: '3', numR: '-2', preset: true});
                this.questions.create({numL: '4', numR: '-1', preset: true});
                this.questions.create({numL: '4', numR: '-2', preset: true});
                this.questions.create({numL: '5', numR: '-0', preset: true});
                this.questions.create({numL: '3', numR: '-3', preset: true});
                this.questions.create({numL: '6', numR: '-4', preset: true});
            }

            MenuChallengesQuestionsSub.__super__.constructor.call(this, engine);
        }

        // Click on a problem event
        MenuChallengesQuestionsSub.prototype.clickQuestion = function(index) {
            return function(index) {
                this.engine.sceneAdd(new PlaySub(this.engine, this.questions, index), 'PlaySub');
                this.engine.changeScenes('PlaySub');
            }.bind(this, index);
        };

        return MenuChallengesQuestionsSub;

    })();
});
