const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
  pattern: "uptime",
  alias: ["runtime"],
  desc: "Shows how long the bot has been running.",
  category: "system",
  react: "⏱️",
  filename: __filename,
},
async (conn, m) => {
  try {
    const uptime = runtime(process.uptime());

    await conn.sendMessage(
      m.from,
      {
        text: `🟢 *PK-XMD Uptime*\n\n⏱️ The bot has been running for:\n\n*${uptime}*`,
        quoted: {
          key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "120363288304618280@newsletter"
          },
          message: {
            contactMessage: {
              displayName: "PK-XMD Bot",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:PK-XMD;;;\nFN:PK-XMD\nitem1.TEL;waid=254700000000:+254700000000\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
            }
          }
        },
        contextInfo: {
          externalAdReply: {
            title: "PK-XMD | System Uptime",
            body: "Bot runtime powered by Pkdriller",
            previewType: "NONE",
            mediaType: 1,
            sourceUrl: "https://github.com/pkdriller/PK-XMD",
            renderLargerThumbnail: false,
          },
          forwardedNewsletterMessageInfo: {
            newsletterName: "PK-XMD Official",
            newsletterJid: "120363288304618280@newsletter"
          }
        }
      }
    );
  } catch (err) {
    console.error(err);
    await m.reply("❌ Error: " + err.message);
  }
});
