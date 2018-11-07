const Tweet = require("../models/Team");

module.exports = {
  async index(req, res) {
    const tweets = await Tweet.find({});

    return res.json(tweets);
  },
  async store(req, res) {
    const tweet = await Tweet.create(req.body);

    req.io.emit('tweet', tweet);

    return res.json(tweet);
  }
};
