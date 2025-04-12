const express = require("express");

const os = require("os");
const { startTikTokLive } = require('./routes/TiktokLiveComment');

const app = express();
const PORT = 8000;

// Thay username TikTok của bạn
const tiktokUsername = "realpewpew";

// Gọi hàm để bắt đầu lắng nghe
startTikTokLive(tiktokUsername);

// Import route
const sendEmail = require("./routes/SendEmail");
const { sendEmailDeploy } = require("./routes/DeployNotification");

// Gắn route tại /chat
app.use("/send-email", sendEmail);

// Route gốc
app.get("/", (req, res) => {
  res.send("Trang chủ");
});

// gửi thông báo deploy
if (os.hostname() !== "DESKTOP-CAPDUR9") sendEmailDeploy();

app.listen(PORT, () => {
  console.log(`Server đang chạy ở http://localhost:${PORT}`);
});
