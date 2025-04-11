const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

// 📧 Thông tin gửi email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ngogiaquyendhtn223@gmail.com",
      pass: "rbuqoqdkledegael", // Gmail nên dùng App Password
    },
  });

async function sendEmailDeploy() {
  console.log("sending...");
  const htmlContent = `
    <h3>📚 Thông báo deploy lên render</h3>
    <p>project của bạn vừa được deploy lên render.com 
    bạn có thể bắt đầu sử dụng ứng dụng</p>
    <hr>
    <p style="font-size: 12px; color: gray;">
    📩 Bạn đang nhận email từ hệ thống học từ vựng. Chúc bạn học tốt!<br/>
    📅 Gửi lúc: [ngày/giờ].
    </p>
  `;

  await transporter.sendMail({
    from: '"Tự học từ vựng" <your_email@gmail.com>',
    to: "dtc225180268@ictu.edu.vn",
    subject: "Thông báo deploy!",
    html: htmlContent,
  });

  console.log("✅ Đã gửi email từ vựng thành công!");
}

module.exports = { sendEmailDeploy };
