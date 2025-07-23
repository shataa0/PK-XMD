const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
  pattern: "uptime",
  alias: ["runtime"],
  desc: "Show how long the bot has been running",
  category: "system",
  react: "⏱️",
  filename: __filename,
},
async (conn, m) => {
  try {
    const up = runtime(process.uptime());

    await conn.sendMessage(m.from, {
      text: `*🔄 PK-XMD Uptime*\n\n⏱️ Bot has been running for:\n*${up}*\n\n_Powered by Pkdriller_`,
      quoted: {
        key: {
          fromMe: false,
          participant: "254700000000@s.whatsapp.net", // use a valid-looking JID
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: "PK-XMD Verified Bot",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:PK-XMD;;;\nFN:PK-XMD\nitem1.TEL;waid=254700000000:+254700000000\nitem1.X-ABLabel:Mobile\nEND:VCARD`
          }
        }
      },
      contextInfo: {
        externalAdReply: {
          title: "PK-XMD WhatsApp Bot",
          body: "Runtime Status",
          mediaType: 1,
          sourceUrl: "https://github.com/mejjar00254/PK-XMD",
          renderLargerThumbnail: false
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "PK-XMD Official"
        }
      }
    });
  } catch (e) {
    console.error(e);
    await m.reply(`❌ *Error*: ${e.message}`);
  }
});
                           
