const { cmd } = require('../command');
const config = require("../config");

const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

cmd({
  on: "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) return;

    const containsLink = linkPatterns.some(pattern => pattern.test(body));
    if (!containsLink) return;

    if (config.ANTI_LINK_KICK === 'true') {
      const vcardFakeContact = {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          ...(from ? { remoteJid: from } : {})
        },
        message: {
          contactMessage: {
            displayName: "WhatsApp Verified",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;;;\nFN:WhatsApp Verified✓\nORG:Meta Verified;\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234-567-890\nEND:VCARD`,
            jpegThumbnail: null
          }
        }
      };

      await conn.sendMessage(from, { delete: m.key }, { quoted: m });

      await conn.sendMessage(from, {
        text: `⚠️ Boss i don't have time for  your links am PK-XMD.\n@${sender.split('@')[0]} byeee remember me😂🔥👑. 🚫`,
        mentions: [sender],
        contextInfo: {
          externalAdReply: {
            title: 'ANTI-LINK SYSTEM',
            body: 'Powered by Pkdriller',
            thumbnailUrl: 'https://files.catbox.moe/fgiecg.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x',
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true
          },
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: "PK-XMD Bot",
            newsletterJid: "120363288304618280@newsletter"
          }
        }
      }, { quoted: vcardFakeContact });

      await conn.groupParticipantsUpdate(from, [sender], "remove");
    }
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing the anti-link system.");
  }
});
