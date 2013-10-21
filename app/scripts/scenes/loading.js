/*
    Scene: Loading
    The initial loading screen
*/
/*global define */
define(["jquery", "scene", "sprite", "startChalk", "text", "button"], function ($, Scene, Sprite, LoadingChalk, Text, Button) {
    "use strict";

    return (function() {
        Scene.extend(Loading);

        Loading.prototype.name = "Loading";

        Loading.prototype.urlCount = 0;
        Loading.prototype.urlsDone = 0;

        function Loading(engine, urls) {
            Loading.__super__.constructor.call(this, engine);

            // Get the url count
            this.urlCount = urls.length;

            // Create the title
            this.entityAdd(new Text(this.engine.ctx.canvas.width / 4, 260, 0, "Loading...", "50px 'Press Start 2P'", "rgb(0, 0, 0)"));

            // Load each url
            var me = this;
            urls.forEach(function(url) {
                var image = new Image();
                image.addEventListener("load", function() {
                    me.urlsDone++;
                }, false);
                image.src = url;
            });
        }

        Loading.prototype.render = function(ctx, dt) {
            // Go to next scene if all loaded
            if (this.urlsDone >= this.urlCount) {
                this.engine.changeScenes("Start");
            }

            // Set the background
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height);

            Loading.__super__.render.call(this, ctx, dt);
        };

        return Loading;

    })();
});
