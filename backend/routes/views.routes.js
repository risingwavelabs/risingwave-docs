const feedbacks = require("../controllers/feedback.controller.js");

module.exports = app => {
    var router = require("express").Router();

    // Create a new feedback
    router.get("/", feedbacks.findAll);

    app.use('/', router);
};