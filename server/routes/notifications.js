
const express = require('express');
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const notes = await Notification.findAll({
    where: { UserId: req.user.id },
    order: [['createdAt', 'DESC']]
  });
  res.json(notes);
});

router.post('/read/:id', auth, async (req, res) => {
  await Notification.update({ isRead: true }, { where: { id: req.params.id } });
  res.json({ message: 'Marked as read' });
});

module.exports = router;
