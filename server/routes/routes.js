const express = require("express");

const router = express.Router();
const Services = require("../services/export.services");

// GET api/
router.get("/:resource", (req, res) => {
  const resource = req.params.resource;

  const service = Services[resource];

  if (!service) {
    res.json({ status: 404, error: "Resource not found" });
    res.end();
    return;
  }
  service.get().then(data => {
    res.json({
      status: 200,
      data: data
    });
    res.end();
  });
});

// GET api/task/status
router.get("/:resource/:status", (req, res) => {
  const resource = req.params.resource;
  const status = req.params.status;

  const service = Services[resource];

  if (!service || !status) {
    res.json({ status: 404, error: "Resource or status not found" });
    res.end();
    return;
  }

  service
    .getTaskByStatus(status)
    .then(response => {
      res.json({
        status: 200,
        data: response
      });
      res.end();
      return;
    })
    .catch(error => {
      res.json({ status: 204 });
      res.end();
      return;
    });
});

// POST api/task/create
router.post("/:resource/create", (req, res) => {
  const resource = req.params.resource;

  const service = Services[resource];

  if (!service) {
    res.json({ status: 404, error: "Resource not found" });
    return;
  }
  service.store(req, res).then(response => {
    res.json({
      status: 201,
      data: response
    });
    res.end();
    return;
  });
});

// DELETE api/task/delete/1
router.delete("/:resource/delete/:id", (req, res) => {
  const resource = req.params.resource;

  const service = Services[resource];

  if (!service) {
    res.json({ status: 404, error: "Resource not found" });
    return;
  }
  service.delete(req, res).then(() => {
    res.end();
    return;
  });
});

// PUT api/task/update/1
router.put("/:resource/update/:id", (req, res) => {
  const resource = req.params.resource;

  const service = Services[resource];

  if (!service) {
    res.json({ status: 404, error: "Resource not found" });
    res.end();
    return;
  }

  service
    .update(req, res)
    .then(data => {
      res.json({
        status: 400,
        error: data
      });
      res.end();
    })
    .catch(error => {
      res.json({
        status: 400,
        error: error
      });
    });
});

// PATCH api/task/complete/1
router.patch("/:resource/complete/:id", (req, res) => {
  var resource = req.params.resource;
  var service = Services[resource];

  if (!service) {
    res.json({ status: 404, error: "Resource not found" });
    res.end();
    return;
  }

  const id = req.params.id;
  service
    .completeTask(id)
    .then(data => {
      res.json({ status: 200, data: data });
      res.end();
      return;
    })
    .catch(error => {
      res.json({ status: 400, error: error });
      res.end();
      return;
    });
});

module.exports = router;
