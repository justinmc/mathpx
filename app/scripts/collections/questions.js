/*
    Backbone Collection: Questions
    Collection of questions
*/
/*global define */
define(["backbone", "question", "localstorage"], function (Backbone, Question) {
    "use strict";

    return Backbone.Collection.extend({
        model: Question,
        localStorage: new Backbone.LocalStorage("Questions"),
    });

});

