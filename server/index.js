require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const sequelize = require('./config/db');

// Models (ensure they're imported before syncing)
require('./models/User');
require('./models/Message');
require('./models/Post');
require('./models/Comment');
require('./models/Notification');
require('./models/Follow');
// require('./models/Payment');
// require('./models/Fee');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const notificationRoutes = require('./routes/notifications');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/notifications', notificationRoutes);
app.use('/messages', messageRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  socket.on('send_message', async (data) => {
    try {
      const msg = await sequelize.models.Message.create({
        content: data.content,
        media: data.media || null,
        UserId: data.userId
      });
      io.emit('receive_message', msg);
    } catch (err) {
      console.error('❌ Message error:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// Start Server & Sync DB
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    server.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
    );
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });


