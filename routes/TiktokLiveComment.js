const { WebcastPushConnection } = require("tiktok-live-connector");
const express = require("express");
const router = express.Router();

// Route: GET /chat
router.get("/", (req, res) => {
  const username = "datkaa0912";
  const tiktokLive = new WebcastPushConnection(username);

  tiktokLive
    .connect()
    .then((state) => {
      console.log(`Connected to roomId ${state.roomId}`);
    })
    .catch((err) => {
      console.error("Failed to connect", err);
    });

  tiktokLive.on("chat", (data) => {
    console.log(`${data.uniqueId}: ${data.comment}`);
  });

  tiktokLive.on("gift", (data) => {
    console.log(`${data.uniqueId} sent gift: ${data.giftName}`);
  });
});

module.exports = router;
