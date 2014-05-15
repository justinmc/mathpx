/*
    Entity: Bar
    Progress bar
*/
/*global define */
define(['jquery'], function ($) {
    'use strict';

    return (function() {
        hoopty.entities.Entity.extend(Bar);

        // Bar
        Bar.prototype.width = 500;
        Bar.prototype.height = 40;
        Bar.prototype.qOffset = 20;

        function Bar(x, y, full) {
            this.x = x;
            this.y = y;
            this.full = full;

            Bar.__super__.constructor.call(this, x, y, this.width, this.height);
        }

        Bar.prototype.render = function(ctx, dt) {
            // Draw the bar
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y);
            ctx.quadraticCurveTo(this.x + this.width + this.qOffset, this.y + this.height / 2, this.x + this.width, this.y + this.height);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.quadraticCurveTo(this.x - this.qOffset, this.y + this.height / 2, this.x, this.y);
            ctx.closePath();
            ctx.stroke();

            // Draw the fill
            ctx.strokeStyle = null;
            ctx.fillStyle = '#ea1e1e';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width * this.full, this.y);
            ctx.quadraticCurveTo(this.x + this.width * this.full - this.qOffset / 2, this.y + this.height / 2, this.x + this.width * this.full, this.y + this.height);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.quadraticCurveTo(this.x - this.qOffset, this.y + this.height / 2, this.x, this.y);
            ctx.closePath();
            ctx.fill();
        };

        return Bar;

    })();
});
