const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "repo",
  alias: ["source", "sc"],
  desc: "Show the bot GitHub repository",
  category: "system",
  filename: __filename,
}, async (Void, m) => {
  const githubUser = "mejjar00254";
  const repoName = "Last-bot";
  const apiUrl = `https://api.github.com/repos/${githubUser}/${repoName}`;

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PKDRILLER | PK-XMD",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER | PK-XMD\nORG:PKDRILLER;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  try {
    const { data } = await axios.get(apiUrl);
    const text = `*📁 PK-XMD GitHub Repository*\n\n` +
                 `🔗 *Repo:* ${data.html_url}\n` +
                 `⭐ *Stars:* ${data.stargazers_count}\n` +
                 `🍴 *Forks:* ${data.forks_count}\n` +
                 `👀 *Watchers:* ${data.watchers_count}\n` +
                 `🆕 *Updated:* ${data.updated_at.split("T")[0]}\n\n` +
                 `⚙️ *Deploy Bot on Panel:*\n` +
                 `▸ Heroku: https://heroku.com/deploy\n` +
                 `▸ Railway: https://railway.app/\n` +
                 `▸ Render: https://render.com/\n\n` +
                 `🔧 Powered by *Pkdriller*`;

    await Void.sendMessage(m.chat, {
      text,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "PK-XMD Official"
        },
        externalAdReply: {
          title: "PK-XMD Source Code",
          body: "Click to open GitHub Repository",
          thumbnailUrl: "https://files.catbox.moe/fgiecg.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: data.html_url
        }
      }
    }, { quoted: fakeContact });
  } catch (e) {
    await m.reply("❌ Failed to fetch repository info.\nCheck the repo name or internet connection.");
  }
});
