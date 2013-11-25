/*global define, alert */
define(["jquery", "scene"], function ($, Scene) {
    "use strict";

    return (function() {

        // DOM Objects
        Engine.prototype.canvas = null;
        Engine.prototype.ctx = null;

        // Scenes
        Engine.prototype.scenes = {};
        Engine.prototype.sceneActive = null;
        Engine.prototype.changeScenesCallback = null;

        function Engine(canvas, changeScenesCallback) {
            // Save the changeScenes callback if given
            if (changeScenesCallback !== null) {
                this.changeScenesCallback = changeScenesCallback;
            }

            // Reset scenes
            Engine.prototype.scenes = {};

            // Save the canvas and context
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");

            // Add event listeners
            var me = this;
            $(this.canvas).on("mousedown", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on("mousemove", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on("mouseup", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on("click", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on("touchstart", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on("touchmove", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on("touchend", function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(document).on("keyup", function(event) {
                me.getSceneActive().eventFire(event);
            });
        }

        // Call at each frame
        Engine.prototype.render = function(dt) {
            // Render the current scene
            this.getSceneActive().render(this.ctx, dt);
        };

        // Create a new scene
        Engine.prototype.sceneAdd = function(scene) {
            this.scenes[scene.name] = scene;
        };

        // Gets the active scene
        Engine.prototype.getSceneActive = function() {
            return this.scenes[this.sceneActive];
        };

        // Changes to the new scene
        Engine.prototype.changeScenes = function(sceneName) {
            this.sceneActive = sceneName;

            // Call the callback if it was given
            if (this.changeScenesCallback !== null) {
                this.changeScenesCallback(this.getSceneActive());
            }
        };

        return Engine;
    })();
});
