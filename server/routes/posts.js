
const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Post = require('../models/Post');

const router = express.Router();

router.post('/', auth, upload.single('media'), async (req, res) => {
  const post = await Post.create({
    content: req.body.content,
    media: req.file ? `/uploads/${req.file.filename}` : null,
    UserId: req.user.id
  });
  res.json(post);
});

router.get('/', auth, async (req, res) => {
  const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
  res.json(posts);
});

router.delete('/:id', auth, async (req, res) => {
  await Post.destroy({ where: { id: req.params.id, UserId: req.user.id } });
  res.json({ message: 'Post deleted' });
});

module.exports = router;
