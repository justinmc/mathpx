/*
    Scene: Start
    The initial start scene
*/
/*global define */
define(['jquery', 'menu', 'chalkHeart'], function ($, Menu, ChalkHeart) {
    'use strict';

    return (function() {
        hoopty.scenes.Scene.extend(Start);

        Start.prototype.name = 'Start';

        function Start(engine) {
            Start.__super__.constructor.call(this, engine);

            // Create the background image
            this.entityAdd(new hoopty.entities.Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, $('img.gettable.gettable-classroom').attr('src'), 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkHeart(240, 240));

            // Create the title
            this.entityAdd(new hoopty.entities.Text(Math.round(this.engine.ctx.canvas.width / 3) - 20, 64, 400, 'Mathpx!', '50px \'Press Start 2P\'', 'rgb(255, 255, 255)'));
            this.entityAdd(new hoopty.entities.Text(Math.round(this.engine.ctx.canvas.width / 3) - 24, 60, 400, 'Mathpx!', '50px \'Press Start 2P\''));
            this.entityAdd(new hoopty.entities.Text(this.engine.ctx.canvas.width - 180, 200, 200, 'Touch to', '20px \'Press Start 2P\''));
            this.entityAdd(new hoopty.entities.Text(this.engine.ctx.canvas.width - 180, 230, 200, 'Continue', '20px \'Press Start 2P\''));
        }

        Start.prototype.render = function(ctx, dt) {
            Start.__super__.render.call(this, ctx, dt);
        };

        // Change to the main game scene on enter/space keyup or mouseup
        Start.prototype.keyup = function(event) {
            if (event.keyCode === 13 || event.keyCode === 32) {
                this.goNextScene();
            }
        };
        Start.prototype.click = function(event) {
            this.goNextScene();
        };

        // Go to the only place you can from this scene, the main menu
        Start.prototype.goNextScene = function() {
            this.engine.changeScenes('Menu', Menu);
        };

        return Start;

    })();
});
