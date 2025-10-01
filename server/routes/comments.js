
const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Comment = require('../models/Comment');

const router = express.Router();

router.post('/:postId', auth, upload.single('media'), async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    media: req.file ? `/uploads/${req.file.filename}` : null,
    parentId: req.body.parentId || null,
    UserId: req.user.id,
    PostId: req.params.postId
  });
  res.json(comment);
});

router.delete('/:id', auth, async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id, UserId: req.user.id } });
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
