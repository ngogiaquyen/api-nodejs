const express = require("express");
const app = express();
const PORT = 8000;

const os = require("os");

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
