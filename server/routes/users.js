
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Follow = require('../models/Follow');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
});

router.post('/follow/:id', auth, async (req, res) => {
  const follow = await Follow.create({
    followerId: req.user.id,
    followingId: req.params.id
  });
  res.json(follow);
});

router.delete('/unfollow/:id', auth, async (req, res) => {
  await Follow.destroy({
    where: {
      followerId: req.user.id,
      followingId: req.params.id
    }
  });
  res.json({ message: 'Unfollowed' });
});

router.get('/suggestions', auth, async (req, res) => {
  const users = await User.findAll({ limit: 5 });
  res.json(users);
});

module.exports = router;
