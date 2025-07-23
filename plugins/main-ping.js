const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    desc: "Check bot speed and uptime",
    category: "system",
    react: "⚡",
    filename: __filename
}, async (conn, m, text, { from, prefix }) => {
    const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
    const date = moment().tz("Africa/Nairobi").format("dddd, MMMM Do YYYY");
    const upt = runtime(process.uptime());

    const start = new Date().getTime();
    const end = new Date().getTime();
    const speed = end - start;

    const pingMsg = `┌─「 *⚡ PK-XMD PING* 」
│ 🧠 *Speed:* ${speed}ms
│ ⏱️ *Uptime:* ${upt}
│ 🕰️ *Time:* ${time}
│ 📅 *Date:* ${date}
└───────────────`;

    await conn.sendMessage(from, { text: pingMsg }, {
        quoted: {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "PKDRILLER",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER\nORG:PK-XMD DEV\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nX-ABLabel:PKDRILLER\nEND:VCARD`
                }
            },
            contextInfo: {
                forwardedNewsletterMessageInfo: {
                    newsletterName: "PK-XMD Bot",
                    newsletterJid: "120363254234618280@newsletter"
                }
            }
        },
        contextInfo: {
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363254234618280@newsletter",
                newsletterName: "PK-XMD Channel"
            },
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 1,
                mediaUrl: "",
                title: "PK-XMD Multi-Device Bot",
                body: `${time} | ${date}`,
                sourceUrl: "https://github.com/pkdriller/PK-XMD"
            }
        }
    });
});
        
