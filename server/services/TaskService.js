const Task = require("../models/Task");

module.exports = {
  // Obter lista de tasks
  async get(req, res) {
    const tasks = await Task.find({});

    return tasks;
  },
  // Salvar task
  async store(req, res) {
    const task = await Task.create(req.body);
    res.json({
      status: 200,
      data: task
    });
    return;
  },
  // Remover task
  async delete(req, res) {
    const task = await Task.deleteOne({ _id: req.params.id });
    res.json({
      status: 200,
      data: task
    });
    return;
  },

  // Atualizar task
  update(req, res) {
    return new Promise((resolve, reject) => {
      Task.findOneAndUpdate(
        { _id: req.params.id }, // query
        {
          modifiedOn: new Date(),
          title: req.body.title,
          description: req.body.description,
          status: req.body.status
        }, // Atualizações à serem feitas
        { new: true, upsert: false }, // Options
        (error, result) => {
          // Callback function
          if (error || !result) {
            reject(
              "Falha ao atualizar a Task. Verifique o ID e tente novamente."
            );
          }
          if (result) resolve(result);
        }
      );
    });
  },

  completeTask(id) {
    return new Promise((resolve, reject) => {
      const task = Task.findOneAndUpdate(
        { _id: id },
        {
          modifiedOn: new Date(),
          status: "completed"
        },
        { new: true, upsert: false },
        (error, result) => {
          if (error || !result) reject("Falha ao completar a task.");

          if (result) resolve(result);
        }
      );
    });
  }
};
