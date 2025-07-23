const { cmd } = require('../command');
const axios = require('axios');

// Fake Verified Contact (vCard)
const fakeContact = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    ...(m.chat ? { remoteJid: "status@broadcast" } : {})
  },
  message: {
    contactMessage: {
      displayName: "Twitter Info Checker",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:Elon Musk\nORG:Verified Account;\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "xstalk",
  alias: ["twitterstalk", "twtstalk"],
  desc: "Get details about a Twitter/X user.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a valid Twitter/X username.");

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/xstalk?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("⚠️ Failed to fetch Twitter/X user details. Ensure the username is correct.");
    }

    const user = data.data;
    const verifiedBadge = user.verified ? "✅" : "❌";

    const caption =
`╭━━━〔 *TWITTER/X STALKER* 〕━━━⊷
┃👤 *Name:* ${user.name}
┃🔹 *Username:* @${user.username}
┃✔️ *Verified:* ${verifiedBadge}
┃👥 *Followers:* ${user.followers_count}
┃👤 *Following:* ${user.following_count}
┃📝 *Tweets:* ${user.tweets_count}
┃📅 *Joined:* ${user.created}
┃🔗 *Profile:* ${user.url}
╰━━━⪼

🔹 *Powered by Pkdriller*`;

    await conn.sendMessage(from, {
      image: { url: user.avatar },
      caption: caption,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: "Twitter/X Profile Info",
          body: "PK-XMD Twitter/X Tools",
          mediaType: 1,
          renderLargerThumbnail: false,
          sourceUrl: user.url
        },
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          serverMessageId: "",
          newsletterName: "PK-XMD Official"
        }
      }
    }, { quoted: fakeContact });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});
      
