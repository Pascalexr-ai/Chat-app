
const express = require('express');
const auth = require('../middleware/auth');
const Message = require('../models/Message');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const messages = await Message.findAll({
    where: { UserId: req.user.id },
    order: [['createdAt', 'DESC']]
  });
  res.json(messages);
});

module.exports = router;
