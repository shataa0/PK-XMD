const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "repo",
  desc: "Show official bot repository with stars, forks, deploy options",
  category: "system",
  react: "📦",
  filename: __filename
}, async (Void, m, text) => {

  const GITHUB_REPO = "mejjar00254/Last-bot";
  const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}`;

  let repoInfo;
  try {
    const { data } = await axios.get(GITHUB_API);
    repoInfo = `⭐ Stars: *${data.stargazers_count}* | 🍴 Forks: *${data.forks_count}*`;
  } catch (err) {
    repoInfo = `⭐ Stars: *N/A* | 🍴 Forks: *N/A*`;
  }

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PKDRILLER",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER✅\nORG:Official;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
      }
    }
  };

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363020792316963@newsletter",
      serverMessageId: "",
      newsletterName: "PK-XMD Updates"
    },
    externalAdReply: {
      showAdAttribution: true,
      title: "📦 PK-XMD GitHub Repository",
      body: "Multi-device WhatsApp bot by Pkdriller",
      renderLargerThumbnail: true,
      mediaType: 1,
      thumbnailUrl: "https://files.catbox.moe/4o9kvi.jpg",
      sourceUrl: "https://github.com/mejjar00254/Last-bot"
    }
  };

  const caption = `
╭───⌈ *PK-XMD BOT REPO* ⌋───⬣
│ 🔗 *GitHub:* 
│ https://github.com/mejjar00254/Last-bot
│
│ ${repoInfo}
│
│ 🚀 *Deploy This Bot:*
│ ▸ Railway: https://railway.app
│ ▸ Render: https://render.com
│ ▸ Heroku: https://heroku.com
│
│ 👤 Author: *Pkdriller*
╰────────────────────⬣
`;

  await Void.sendMessage(m.from, { text: caption.trim(), contextInfo }, { quoted: fakeContact });
});
