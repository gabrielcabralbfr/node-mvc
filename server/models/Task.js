const mongoose = require("mongoose");

const Task = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: 'pending'
  },

  deadline: {
    type: Date,
    default: null
  },

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
