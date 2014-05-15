/*
   Scene: MenuLearning
   The menu for the Learning mode
*/
/*global define */
define(['jquery', 'playLearning', 'playQuizLearning', 'menuChallenges', 'about', 'startChalk', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack', 'questions'], function ($, PlayLearning, PlayQuizLearning, MenuChallenges, About, MenuChalk, TextPx, TextPxTitle, ButtonPx, ButtonBack, Questions) {
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
            this.entityAdd(new MenuChalk(100, 180));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack.bind(this)));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 20, 70, 300, 'Learning Mode'));

            // Create the big play button
            this.entityAdd(new ButtonPx(centerX, 360, 'Play!', this.clickPlay.bind(this)));

            // Create the progress bars
            var spriteImageMath = $('img.gettable.gettable-math').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(240, 120, 32, 32, spriteImageMath, 0, 0, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(254, 126, 32, 32, spriteImageMath, 0, 0, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(240, 170, 32, 32, spriteImageMath, 0, 0, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(254, 176, 32, 32, spriteImageMath, 0, 1, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(240, 220, 32, 32, spriteImageMath, 0, 1, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(254, 226, 32, 32, spriteImageMath, 0, 0, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(240, 270, 32, 32, spriteImageMath, 0, 1, 16, 16));
            this.entityAdd(new hoopty.entities.Sprite(254, 276, 32, 32, spriteImageMath, 0, 1, 16, 16));

            // Create the question collection
            this.questions = new Questions('questionsLearning');
            this.questions.fetch();
            if (!this.questions.length) {
                this.questions.reset();
                this.questions.getNextIntelligent();
            }
        }

        MenuLearning.prototype.render = function(ctx, dt) {
            MenuLearning.__super__.render.call(this, ctx, dt);
        };

        // On clicking the Play button, create a new question and start playing with it
        MenuLearning.prototype.clickPlay = function() {
            var question = this.questions.getNextIntelligent();

            // If the question has been answered correctly already, do a quiz version
            if (question.get('timeEnd')) {
                this.engine.scenes.PlayQuizLearning = new PlayQuizLearning(this.engine, this.questions, question.get('id'), MenuLearning);
                this.engine.changeScenes('PlayQuizLearning');
            }
            // Otherwise use the question normally
            else {
                this.engine.scenes.PlayLearning = new PlayLearning(this.engine, this.questions, question.get('id'), MenuLearning);
                this.engine.changeScenes('PlayLearning');
            }
        };

        // Back button click
        MenuLearning.prototype.clickBack = function(event) {
            this.engine.changeScenes('Menu', require('menu'));
        };

        return MenuLearning;

    })();
});
