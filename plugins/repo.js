const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: "repo",
  desc: "Display bot GitHub repository and deploy guide",
  category: "system",
  react: "🗂️",
  filename: __filename
}, 
async (conn, m, { from }) => {
  try {
    const repo = "mejjar00254/PK-XMD";
    const api = `https://api.github.com/repos/${repo}`;
    const { data } = await axios.get(api);

    const text = `
╭───❖ 「 *PK-XMD - GitHub Repo* 」 ❖───⬣
│🔹 *Name:* ${data.name}
│🔸 *Owner:* ${data.owner.login}
│📦 *Repo:* ${data.full_name}
│⭐ *Stars:* ${data.stargazers_count}
│🍴 *Forks:* ${data.forks_count}
│📂 *Open Issues:* ${data.open_issues}
│📅 *Created:* ${new Date(data.created_at).toDateString()}
│🌐 *URL:* ${data.html_url}
╰──────────────────────────────⬣

📘 *Description:* ${data.description || "No description available"}

🚀 *Deploy This Bot Easily On:*
┌──────────────┐
│ 🌐 Render.com
│ 🛠️ Railway.app
│ ☁️ Heroku.com
└──────────────┘

📍 Just clone the repo and follow the setup instructions.
Node.js v18+ and Baileys are required.

🔗 *GitHub:* ${data.html_url}
🧑‍💻 *Maintainer:* Pkdriller
⚡ *Powered by:* PKDRILLER
`;

    const vcard = {
      displayName: "PK-XMD Bot",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD Bot\nORG:PK-XMD Official;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nX-USER-TYPE:BOT\nEND:VCARD`
    };

    await conn.sendMessage(from, {
      text,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "PK-XMD GitHub Repository",
          body: "Deploy on Render | Railway | Heroku",
          thumbnailUrl: "https://files.catbox.moe/fgiecg.jpg", // You can replace with your logo
          sourceUrl: data.html_url,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Bot Updates",
          newsletterJid: "120363288304618280@newsletter"
        },
        quotedMessage: {
          contactMessage: {
            displayName: "PK-XMD",
            vcard: vcard.vcard
          }
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply("❌ Failed to fetch GitHub repo info. Please try again later.");
  }
});
