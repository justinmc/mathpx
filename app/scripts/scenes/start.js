/*
    Scene: Start
    The initial start scene
*/
/*global define */
define(['jquery', 'scene', 'menu', 'sprite', 'chalkHeart', 'text'], function ($, Scene, Menu, Sprite, ChalkHeart, Text) {
    'use strict';

    return (function() {
        Scene.extend(Start);

        Start.prototype.name = 'Start';

        function Start(engine) {
            Start.__super__.constructor.call(this, engine);

            // Create the background image
            this.entityAdd(new Sprite(0, 0, this.engine.ctx.canvas.width, this.engine.ctx.canvas.height, $('img.gettable.gettable-classroom').attr('src'), 0, 0, 96, 64));

            // Create the fun chalk dude!
            this.entityAdd(new ChalkHeart(240, 240));

            // Create the title
            this.entityAdd(new Text(Math.round(this.engine.ctx.canvas.width / 3), 50, 0, 'Math Pix!', '32px \'Press Start 2P\''));
            this.entityAdd(new Text(this.engine.ctx.canvas.width - 180, 200, 0, 'Touch to', '20px \'Press Start 2P\''));
            this.entityAdd(new Text(this.engine.ctx.canvas.width - 180, 230, 0, 'Continue', '20px \'Press Start 2P\''));
        }

        Start.prototype.render = function(ctx, dt) {
            // Set the background
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Start.__super__.render.call(this, ctx, dt);
        };

        // Change to the main game scene on keyup/mouseup
        Start.prototype.keyup = function(event) {
            this.goNextScene();
        };
        Start.prototype.mouseup = function(event) {
            this.goNextScene();
        };

        // Go to the only place you can from this scene, the main menu
        Start.prototype.goNextScene = function() {
            this.engine.changeScenes('Menu', Menu);
        };

        return Start;

    })();
});
