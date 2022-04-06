const sql = require("./db.js");
// constructor
const FeedBack = function(feedback) {
  this.email = feedback.email;
  this.description = feedback.description;
  this.like = feedback.like;
};
FeedBack.create = (feedback, result) => {
  sql.query("INSERT INTO feedbacks SET ?", feedback, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...feedback });
  });
};
FeedBack.getAll = (title, result) => {
  let query = "SELECT * FROM feedbacks";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = FeedBack;