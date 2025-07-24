const settingsManager = require('../lib/settingsmanager');
const { cmd } = require('../command');

cmd({
    pattern: "anticall",
    alias: ["callblock", "togglecall"],
    desc: "Manages the anti-call feature. Use: .anticall [on/off]",
    category: "owner",
    react: "📞",
    filename: __filename,
    owner: true // ✅ Allow owners (not only fromMe)
},
async (conn, mek, m, { isOwner, reply, from, sender, args, prefix }) => {
    try {
        let currentStatus = settingsManager.getSetting('ANTICALL');
        const arg = args[0] ? args[0].toLowerCase() : '';

        let replyText;
        let finalReactionEmoji = '📞';

        if (arg === 'on') {
            if (currentStatus) {
                replyText = `📞 Anti-call feature is already *enabled*.`;
                finalReactionEmoji = 'ℹ️';
            } else {
                settingsManager.setSetting('ANTICALL', true);
                replyText = `📞 Anti-call feature has been *enabled*!`;
                finalReactionEmoji = '✅';
            }
        } else if (arg === 'off') {
            if (!currentStatus) {
                replyText = `📞 Anti-call feature is already *disabled*.`;
                finalReactionEmoji = 'ℹ️';
            } else {
                settingsManager.setSetting('ANTICALL', false);
                replyText = `📞 Anti-call feature has been *disabled*!`;
                finalReactionEmoji = '❌';
            }
        } else if (arg === '') {
            const statusEmoji = currentStatus ? '✅ ON' : '❌ OFF';
            replyText = `
*📞 Anti-Call Feature Manager*

Current Status: *${statusEmoji}*

To turn On:
  \`\`\`${prefix}anticall on\`\`\`
To turn Off:
  \`\`\`${prefix}anticall off\`\`\`
            `.trim();
            finalReactionEmoji = '❓';
        } else {
            replyText = `❌ Invalid argument. Use \`${prefix}anticall on\` or \`${prefix}anticall off\`.`;
            finalReactionEmoji = '❓';
        }

        await conn.sendMessage(from, {
            react: { text: finalReactionEmoji, key: mek.key }
        });

        await conn.sendMessage(from, {
            text: replyText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363254234618280@newsletter',
                    newsletterName: "𝙿𝙺-𝚇𝙼𝙳",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in anticall command:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
          
