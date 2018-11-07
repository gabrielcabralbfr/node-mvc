const Task = require("../models/Task");

module.exports = {
  async get(req, res) {
    const tasks = await Task.find({});

    return tasks;
  },
  async store(req) {
    const task = await Task.create(body);
    res.json({
      status: 200,
      data: task
    });
    return;
  }
};
