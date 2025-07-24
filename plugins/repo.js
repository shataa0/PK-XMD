const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: "repo",
  desc: "Show the official bot repository",
  category: "system",
  react: "📁",
  filename: __filename
}, 
async (conn, m, { from, prefix }) => {
  try {
    const repo = "mejjar00254/PK-XMD"; // Replace with your actual GitHub repo
    const apiUrl = `https://api.github.com/repos/${repo}`;
    const { data } = await axios.get(apiUrl);

    const txt = `
*📦 PK-XMD - Official GitHub Repository*

📌 *Name:* ${data.name}
🧑‍💻 *Owner:* ${data.owner.login}
🌐 *URL:* ${data.html_url}
📄 *Description:* ${data.description || "No description provided"}
⭐ *Stars:* ${data.stargazers_count}
🍴 *Forks:* ${data.forks_count}
🔧 *Issues:* ${data.open_issues}
📅 *Created:* ${new Date(data.created_at).toDateString()}

────────────────────
🚀 *How to Deploy PK-XMD Bot*

You can deploy this WhatsApp MD bot on:

🔹 [Render](https://render.com)
🔹 [Railway](https://railway.app)
🔹 [Heroku](https://heroku.com)

Clone the repo and follow setup instructions in the README. Node.js & Baileys is required.

🔗 GitHub: ${data.html_url}
📖 Docs: Check the README file in the repo

> ⚡ *Powered by Pkdriller* ⚡
`;

    const vcard = {
      displayName: "PK-XMD",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD Bot\nORG:PK-XMD Official;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nX-USER-TYPE:BOT\nEND:VCARD`
    };

    await conn.sendMessage(from, {
      text: txt.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "PK-XMD GitHub Repository",
          body: "Deploy to Railway | Heroku | Render",
          thumbnailUrl: "https://files.catbox.moe/fgiecg.jpg", // optional image URL
          sourceUrl: data.html_url,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Bot",
          newsletterJid: "120363288304618280@newsletter"
        },
        quotedMessage: {
          contactMessage: {
            displayName: "PK-XMD Bot",
            vcard: vcard.vcard
          }
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error("Error fetching repo:", err);
    return m.reply("❌ Failed to fetch repository info. Please check the repo name or try again later.");
  }
});
          
