const { WebcastPushConnection } = require('tiktok-live-connector');

// Hàm để khởi động kết nối livestream TikTok
function startTikTokLive(username) {
    const tiktokLive = new WebcastPushConnection(username);

    tiktokLive.connect().then(state => {
        console.log(`Connected to roomId ${state.roomId}`);
    }).catch(err => {
        console.error('Failed to connect', err);
    });

    tiktokLive.on('chat', data => {
        console.log(`${data.uniqueId}: ${data.comment}`);
    });

    tiktokLive.on('gift', data => {
        console.log(`${data.uniqueId} sent gift: ${data.giftName}`);
    });
}

// Export hàm
module.exports = { startTikTokLive };
