const mongoose = require("mongoose");

const Task = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Task", Task);
