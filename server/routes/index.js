const express = require("express");

const router = express.Router();
const Controllers = require("../controllers/");

// router.get('/tweets', TweetController.index)
// router.post('/tweets', TweetController.store)
// router.post('/likes/:id', LikeController.store)

router.get("/:resource", (req, res) => {
  const resource = req.params.resource;

  const controller = Controllers[resource];

  if (!controller) {
    res.json({ status: 400, error: "Resource not found" });
    return;
  }
  controller.get().then(data => {
    res.json({
      status: 200,
      data: data
    });
    res.end();
  });
});

router.post("/:resource", (req, res) => {
  const resource = req.params.resource;

  const controller = Controllers[resource];

  if (!controller) {
    res.json({ status: 404, error: "Resource not found" });
    return;
  }
  controller.store(req.body);

  res.end();
});

module.exports = router;
