/*
    Entity: Sprite: Graph
    Simple Line showing a point representing a score
*/
/*global define */
define(['jquery'], function ($) {
    'use strict';

    return (function() {
        hoopty.entities.Sprite.extend(Graph);

        Graph.prototype.width = 16;
        Graph.prototype.height = 16;

        // Sprite
        Graph.prototype.spriteSheet = $('img.gettable.gettable-math').attr('src');
        Graph.prototype.spriteWidth = 16;
        Graph.prototype.spriteHeight = 16;
        Graph.prototype.spriteX = 0;
        Graph.prototype.spriteY = 0;

        // Graph
        Graph.prototype.yOriginal = null;
        Graph.prototype.graphHeight = 50;
        Graph.prototype.notchLength = 6;

        function Graph(x, y, score) {
            this.yOriginal = y;

            // Calculate y pos of num from score
            y = y - this.height / 2;
            if (score <= -6) {
                y = y + this.graphHeight;
            }
            else if (score < 0) {
                y = y + 3 * this.graphHeight / 4;
            }
            else if (!score) {
                y = y + this.graphHeight / 2;
            }
            else if (score > 0 && score < 6) {
                y = y + this.graphHeight / 4;
            }

            // Use the blue num if negative score
            if (score < 0) {
                this.spriteY = 1;
            }

            Graph.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
        }

        Graph.prototype.render = function(ctx, dt) {
            var x = this.x + this.width / 2;

            // Draw the line
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 3;
            ctx.moveTo(x, this.yOriginal);
            ctx.lineTo(x, this.yOriginal + this.graphHeight);
            ctx.stroke();
            
            // Draw the notches
            ctx.moveTo(x - this.notchLength / 2, this.yOriginal);
            ctx.lineTo(x + this.notchLength / 2, this.yOriginal);
            ctx.stroke();
            ctx.moveTo(x - this.notchLength, this.yOriginal + this.graphHeight / 2);
            ctx.lineTo(x + this.notchLength, this.yOriginal + this.graphHeight / 2);
            ctx.stroke();
            ctx.moveTo(x - this.notchLength / 2, this.yOriginal + this.graphHeight);
            ctx.lineTo(x + this.notchLength / 2, this.yOriginal + this.graphHeight);
            ctx.stroke();

            // Draw the sprite
            Graph.__super__.render.call(this, ctx, dt);
        };

        return Graph;

    })();
});
