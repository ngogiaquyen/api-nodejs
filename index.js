const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Khởi tạo Socket.IO

// Cấu hình static file (nếu cần thiết)
app.use(express.static('public'));

// Khi có người dùng kết nối
io.on('connection', (socket) => {
  console.log('A user connected');

  // Khi có message từ client
  socket.on('chat message', (msg) => {
    // Gửi message cho tất cả các client
    io.emit('chat message', msg);
  });

  // Khi người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Khởi chạy server tại port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
