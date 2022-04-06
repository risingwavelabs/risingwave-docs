const FeedBack = require("../models/feedback.model.js");

exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a FeedBack
  const feedback = new FeedBack({
    email: req.body.email,
    description: req.body.description,
    like: req.body.like || false
  });

  // Save FeedBack in the database
  FeedBack.create(feedback, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the FeedBack."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    FeedBack.getAll(title, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving feedbacks."
        });
        else {
            res.render('pages/index', {
                feedbacks: data,
            });
        }
    });
}