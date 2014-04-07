/*
    Scene: Victory
    Shown after all problems completed
*/
/*global define */
define(['jquery', 'menu', 'play', 'menuChallenges', 'chalkTTT', 'textPx', 'textPxTitle', 'buttonPx', 'buttonBack'], function ($, Menu, Play, MenuChallenges, ChalkTTT, TextPx, TextPxTitle, ButtonPx, ButtonBack) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(Victory);

        Victory.prototype.name = 'Victory';

        Victory.prototype.nameSection = '';
        Victory.prototype.nameMenu = 'Menu';
        Victory.prototype.TypeMenu = Menu;

        function Victory(engine, nameSection, nameMenu, TypeMenu) {
            Victory.__super__.constructor.call(this, engine);

            // Get the parameters
            if (typeof nameSection !== 'undefine' && nameSection !== null && nameSection !== '') {
                this.nameSection = nameSection;
            }
            if (typeof nameMenu !== 'undefine' && nameMenu !== null && nameMenu !== '') {
                this.nameMenu = 'Menu';
            }

            // Create the background image
            var spriteImage = $('img.gettable.gettable-chalkboard-bg').attr('src');
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, spriteImage, 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkTTT(380, 320));

            // Create the title
            var centerX = Math.round(this.engine.ctx.canvas.width / 3);
            this.entityAdd(new ButtonBack(this.clickBack()));
            this.entityAdd(new TextPxTitle());
            this.entityAdd(new TextPx(centerX - 160, 170, 1000, this.nameSection));
            this.entityAdd(new TextPx(centerX - 80, 130, 1000, 'CHALLENGE COMPLETE!'));

            // Create the buttons
            this.entityAdd(new ButtonPx(centerX, 220, 'Challenges', this.clickChallenges()));
        }

        Victory.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Victory.__super__.render.call(this, ctx, dt);
        };

        // Back to menu button
        Victory.prototype.clickBack = function(event) {
            var me = this;
            return function(event) {
                me.engine.changeScenes(me.nameMenu, me.TypeMenu);
            };
        };

        // Challenges button click event
        Victory.prototype.clickChallenges = function(event) {
            var me = this;
            return function() {
                me.engine.changeScenes('MenuChallenges', require('menuChallenges'));
            };
        };

        return Victory;

    })();
});
