const express = require("express");
const { sendVocabEmail } = require("../helper");
const router = express.Router();

// Route: GET /chat
router.get("/", (req, res) => {
  sendVocabEmail();
  res.send("Đây là trang Chat");
});

// Có thể thêm nhiều route ở đây như:
// router.post('/', (req, res) => { ... })

module.exports = router;
