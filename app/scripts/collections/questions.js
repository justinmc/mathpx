/*
    Backbone Collection: Questions
    Collection of questions
*/
/*global define */
define(["backbone", "question"], function (Backbone, Question) {
    "use strict";

    return Backbone.Collection.extend({
        model: Question,
    });

});

