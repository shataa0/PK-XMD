const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  use: '.ping',
  desc: "Check bot response speed",
  category: "main",
  react: "⚡",
  filename: __filename
},
async (conn, mek, m, { from, sender }) => {
  try {
    const start = new Date().getTime();

    await conn.sendMessage(from, {
      react: { text: '⚙️', key: mek.key }
    });

    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `*『 PK-XMD SYSTEM PING 』*\n\n📡 *Response:* _${responseTime.toFixed(3)}s_\n🔧 *Status:* _Online_\n🕒 *Uptime:* _${Math.floor(process.uptime())}s_\n\n_Powered by PKDRILLER_`;

    // Fake vCard Contact (Blue tick style)
    const quotedContact = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "PKDRILLER ✓",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER ✓\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
        }
      }
    };

    await conn.sendMessage(from, {
      text,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363288304618280@newsletter',
          newsletterName: "PK-XMD Official",
          serverMessageId: 105
        }
      }
    }, { quoted: quotedContact });

  } catch (err) {
    console.log(err);
    await conn.sendMessage(from, { text: `Error: ${err.message}` });
  }
});
          
