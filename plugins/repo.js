const { cmd } = require('../command');
const moment = require('moment-timezone');
const config = require('../config');

cmd({
  pattern: "repo",
  desc: "Displays the official GitHub repository of the bot.",
  category: "system",
  filename: __filename
}, async (Void, m, text, { prefix }) => {

  const botName = 'PK-XMD';
  const repoUrl = 'https://github.com/pkdriller/PK-XMD'; // badilisha kama iko tofauti
  const developer = 'Pkdriller';

  const fakeContact = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: `${botName} | By ${developer}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${botName} | By ${developer}\nORG:${developer};\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
      }
    }
  };

  const caption = `╭━━━〔 *${botName} - GitHub* 〕━━⬣
┃ 👤 *Developer:* ${developer}
┃ 🛠️ *Repository:* ${repoUrl}
┃ ⚡ *Powered by:* Pkdriller
┃ 💻 *Auto Deploy:* Heroku | Render | Railway
╰━━━━━━━━━━━━━━━━━━⬣`;

  await Void.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/fgiecg.jpg' }, // badilisha kwa picha yako
    caption: caption,
    contextInfo: {
      externalAdReply: {
        title: `${botName} GitHub Repo`,
        body: 'Deploy this bot now!',
        mediaType: 1,
        showAdAttribution: true,
        sourceUrl: repoUrl,
        renderLargerThumbnail: false
      },
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: "PK-XMD Official",
        serverMessageId: 1
      },
      mentionedJid: [m.sender]
    }
  }, { quoted: fakeContact });
});
      
