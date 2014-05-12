/*
   Scene: MenuLearning
   The menu for the Learning mode
*/
/*global define */
define(['jquery', 'playLearning', 'playQuiz', 'menuChallenges', 'about', 'chalkHouse', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack', 'questions'], function ($, PlayLearning, PlayQuiz, MenuChallenges, About, ChalkHouse, TextPx, TextPxTitle, ButtonPx, ButtonBack, Questions) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(MenuLearning);

        MenuLearning.prototype.name = 'MenuLearning';
        MenuLearning.prototype.route = '/learning';

        MenuLearning.prototype.questions = null;

        function MenuLearning(engine) {
            MenuLearning.__super__.constructor.call(this, engine);

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkHouse(740, 100));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack.bind(this)));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 20, 70, 300, 'Learning Mode'));

            // Create the big play button
            this.entityAdd(new ButtonPx(centerX, 360, 'Play!', this.clickPlay.bind(this)));

            // Create the question collection
            this.questions = new Questions('questionsLearning');
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.createQuestion();
            }
        }

        MenuLearning.prototype.render = function(ctx, dt) {
            MenuLearning.__super__.render.call(this, ctx, dt);
        };

        // Intelligently create a new question for the user
        MenuLearning.prototype.createQuestion = function() {
            this.questions.createIntelligent();
        };

        // On clicking the Play button, create a new question and start playing with it
        MenuLearning.prototype.clickPlay = function() {
            var question = this.questions.createIntelligent();
            this.engine.scenes['PlayLearning'] = new PlayLearning(this.engine, this.questions, question.get('id'), MenuLearning);
            this.engine.changeScenes('PlayLearning');
        };

        // Back button click
        MenuLearning.prototype.clickBack = function(event) {
            this.engine.changeScenes('Menu', require('menu'));
        };

        return MenuLearning;

    })();
});
