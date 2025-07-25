const { cmd } = require('../command');

cmd({
    pattern: "jid",
    alias: ["id", "chatid", "gjid"],
    desc: "Get the full JID of group/user (Creator only)",
    react: "🆔",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, {
    from, isGroup, isCreator, reply, sender
}) => {
    try {
        if (!isCreator) {
            return await reply("❌ *Access Denied:* This command is only for the bot owner.");
        }

        const targetJID = isGroup
            ? (from.endsWith('@g.us') ? from : `${from}@g.us`)
            : (sender.endsWith('@s.whatsapp.net') ? sender : `${sender}@s.whatsapp.net`);

        const type = isGroup ? '👥 *Group JID:*' : '👤 *User JID:*';

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/fgiecg.jpg` }, // Replace with your logo/image
            caption: `
${type}
\`\`\`${targetJID}\`\`\`

⚡ *Powered by Pkdriller*
            `.trim(),
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: 'PK-XMD UPDATES',
                    serverMessageId: 118
                }
            }
        }, {
            quoted: {
                key: {
                    fromMe: false,
                    participant: '0@s.whatsapp.net',
                    remoteJid: 'status@broadcast'
                },
                message: {
                    contactMessage: {
                        displayName: 'PK-XMD VERIFIED',
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD\nTEL;waid=254700000000:+254 700 000000\nEND:VCARD`
                    }
                }
            }
        });

    } catch (e) {
        console.error("JID Error:", e);
        await reply(`⚠️ *Error:* Could not fetch JID.\n\n${e.message}`);
    }
});
  
