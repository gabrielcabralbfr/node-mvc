const express = require("express");

const router = express.Router();
const Services = require("../services/export.services");

// GET api/
router.get("/:resource", (req, res) => {
  const resource = req.params.resource;

  const service = Services[resource];

  if (!service) {
    res.json({ status: 400, error: "Resource not found" });
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

// POST api/
router.post("/:resource/create", (req, res) => {
  const resource = req.params.resource;

  const service = Services[resource];

  if (!service) {
    res.json({ status: 404, error: "Resource not found" });
    return;
  }
  service.store(req, res).then(() => {
    res.end();
    return;
  });
});

// DELETE api/
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

// PUT api/
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
