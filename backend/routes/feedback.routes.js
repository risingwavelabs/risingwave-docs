module.exports = app => {
    const feedbacks = require("../controllers/feedback.controller.js");
    var router = require("express").Router();

    // Create a new feedback
    router.post("/", feedbacks.create);

    // Retrieve all Feedbacks
    router.get("/", feedbacks.findAll);

    app.use('/api/feedbacks', router);
};