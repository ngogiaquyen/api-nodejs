const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Trong production nên thay bằng domain cụ thể của React app
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chat server is running' });
});

// Cấu hình static file (nếu cần thiết)
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Thông báo cho tất cả client biết có người mới tham gia
  io.emit('user connected', 'Một người dùng mới đã tham gia chat');

  // Khi có message từ client
  socket.on('chat message', (msg) => {
    // Gửi message cho tất cả các client
    io.emit('chat message', msg);
  });

  // Khi người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Thông báo cho tất cả client biết có người rời đi
    io.emit('user disconnected', 'Một người dùng đã rời khỏi chat');
  });
});

// Khởi chạy server tại port 8000
server.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
