// daily-vocab.js
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

// 🔐 Thông tin kết nối MySQL (thay bằng thông tin thật)
const db = {
  host: "103.97.126.29",
  user: "jcjvjome_api-nodejs",
  password: "KhJfYvKw3wdVUzeWJx87",
  database: "jcjvjome_api-nodejs",
};

// 📧 Thông tin gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ngogiaquyendhtn223@gmail.com",
    pass: "rbuqoqdkledegael", // Gmail nên dùng App Password
  },
});

async function getRandomVocab(count = 5) {
  const conn = await mysql.createConnection(db);
  console.log("kết nối tới csdl thành công !")
  const [rows] = await conn.execute(
    `SELECT * FROM vocabulary ORDER BY RAND() LIMIT ?`,
    [count]
  );
  await conn.end();
  console.log(rows)
  return rows;
}

function formatVocabHtml(vocabList) {
  return vocabList
    .map(
      (v, i) => `
    <p><b>${i + 1}. ${v.word}</b> - ${v.meaning_vi}<br/>
    <i>${v.example_en}</i><br/>
    📘 ${v.example_vi}</p>
  `
    )
    .join("");
}

async function sendVocabEmail() {
  console.log("sending...");
  const vocabList = await getRandomVocab();
  console.log(formatVocabHtml(vocabList))
  const htmlContent = `
    <h3>📚 Từ vựng hôm nay</h3>
    ${formatVocabHtml(vocabList)}
    <hr>
    <p style="font-size: 12px; color: gray;">
    📩 Bạn đang nhận email từ hệ thống học từ vựng. Chúc bạn học tốt!<br/>
    📅 Gửi lúc: [ngày/giờ].
    </p>
  `;

  await transporter.sendMail({
    from: '"Tự học từ vựng" <your_email@gmail.com>',
    to: "dtc225180268@ictu.edu.vn",
    subject: "📖 5 từ vựng mới hôm nay!",
    html: htmlContent,
  });

  console.log("✅ Đã gửi email từ vựng thành công!");
}

// 🕗 Tự động gửi mỗi sáng 8h
schedule.scheduleJob("0 8 * * *", sendVocabEmail);
// schedule.scheduleJob("15 22 * * *", sendVocabEmail);

// 🧪 Test ngay:
// sendVocabEmail();
module.exports = { sendVocabEmail };
