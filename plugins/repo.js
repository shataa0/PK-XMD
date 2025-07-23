const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
  pattern: "repo",
  alias: ["source", "sc", "script"],
  desc: "Display PK-XMD bot's GitHub repository info",
  category: "info",
  react: "📁",
  filename: __filename
}, 
async (conn, m, msg, { from, reply }) => {

  const GITHUB_REPO = 'https://github.com/mejjar00254/Last-bot';

  try {
    const [, username, repo] = GITHUB_REPO.match(/github\.com\/([^/]+)\/([^/]+)/);

    const res = await axios.get(`https://api.github.com/repos/${username}/${repo}`);
    const data = res.data;

    const caption = `
╭───「 *PK-XMD GITHUB REPO* 」
│
├ 🔹 *Repository:* ${data.name}
├ 🔸 *Author:* @${username}
├ ⭐ *Stars:* ${data.stargazers_count}
├ 🍴 *Forks:* ${data.forks_count}
├ 🧾 *About:* ${data.description || 'An advanced multi-device WhatsApp bot'}
│
├ 📎 *GitHub:* 
│   ${data.html_url}
│
├ 🚀 *Deploy Instantly:*
│   Heroku | Railway | Render
│   (Panel support ready)
│
╰───「 *⚡ Powered by Pkdriller* 」
    `.trim();

    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/7zfdcq.jpg' }, // main banner only
      caption,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          serverMessageId: 777,
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "PK-XMD Updates"
        },
        externalAdReply: {
          title: "PK-XMD • Source Code",
          body: "By Pkdriller | GitHub Deployment",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false,
          sourceUrl: GITHUB_REPO
        }
      }
    }, { quoted: {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "PKDRILLER",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;PKDRILLER;;;\nFN:PKDRILLER\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Developer\nEND:VCARD`
        }
      }
    } });

  } catch (e) {
    console.error("Repo fetch error:", e);
    return reply("❌ Could not retrieve repository details. Try again later.");
  }

});
      
