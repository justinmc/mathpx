/*
    Backbone Model: Question
    A record of a problem attempted by the user
*/
/*global define */
define(["backbone"], function (Backbone) {
    "use strict";

    return Backbone.Model.extend({

        mode: null,
        numL: 0,
        numR: 0,
        timeStart: null,
        timeEnd: null,

        initialize: function() {
        },

        start: function() {
            this.timeStart = new Date().getTime();
        },

        end: function() {
            this.timeEnd = new Date().getTime();
        },

        getAnswer: function() {
            return this.get("numL") + this.get("numR");
        },

    });

});
