/*
    Backbone Model: Question
    A record of a problem attempted by the user
*/
/*global define */
define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            mode: null,
            numL: 0,
            numR: 0,
            timeStart: null,
            timeEnd: null,
            preset: false,
        },

        initialize: function() {
        },

        start: function() {
            this.timeStart = new Date().getTime();
        },

        end: function() {
            this.timeEnd = new Date().getTime();
        },

        getAnswer: function() {
            return parseInt(this.get('numL'), 10) + parseInt(this.get('numR'), 10);
        },

    });

});
