const { isJidGroup } = require('@whiskeysockets/baileys');
const { loadMessage, getAnti } = require('../data');
const config = require('../config');

const fakeVCard = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    contactMessage: {
      displayName: config.BOT_NAME + " ✅",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.BOT_NAME} | Pkdriller\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
      jpegThumbnail: Buffer.alloc(0)
    }
  }
};

const DeletedText = async (conn, mek, jid, deleteInfo, isGroup, update) => {
  const messageContent = mek.message?.conversation || mek.message?.extendedTextMessage?.text || 'Unknown content';
  deleteInfo += `\n◈ Content ━ ${messageContent}`;

  await conn.sendMessage(
    jid,
    {
      text: deleteInfo,
      contextInfo: {
        mentionedJid: isGroup ? [update.key.participant, mek.key.participant] : [update.key.remoteJid],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: config.BOT_NAME,
          serverMessageId: 999
        },
        externalAdReply: {
          title: "PK-XMD Anti-Delete",
          body: "Message recovered 👑",
          mediaType: 1,
          previewType: "PHOTO",
          showAdAttribution: true,
          renderLargerThumbnail: false,
          sourceUrl: "https://github.com/mejjar00254/PK-XMD"
        }
      }
    },
    { quoted: fakeVCard }
  );
};

const DeletedMedia = async (conn, mek, jid, deleteInfo) => {
  const antideletedmek = structuredClone(mek.message);
  const messageType = Object.keys(antideletedmek)[0];

  if (antideletedmek[messageType]) {
    antideletedmek[messageType].contextInfo = {
      stanzaId: mek.key.id,
      participant: mek.sender,
      quotedMessage: mek.message,
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: config.BOT_NAME,
        serverMessageId: 999
      }
    };
  }

  if (messageType === 'imageMessage' || messageType === 'videoMessage') {
    antideletedmek[messageType].caption = deleteInfo;
  } else if (messageType === 'audioMessage' || messageType === 'documentMessage') {
    await conn.sendMessage(jid, { text: `*⚠️ Deleted Message Alert 🚨*\n${deleteInfo}` }, { quoted: fakeVCard });
  }

  await conn.relayMessage(jid, antideletedmek, {});
};

const AntiDelete = async (conn, updates) => {
  for (const update of updates) {
    if (update.update.message === null) {
      const store = await loadMessage(update.key.id);
      if (store && store.message) {
        const mek = store.message;
        const isGroup = isJidGroup(store.jid);
        const antiDeleteStatus = await getAnti();
        if (!antiDeleteStatus) continue;

        const deleteTime = new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        let deleteInfo, jid;
        if (isGroup) {
          const groupMetadata = await conn.groupMetadata(store.jid);
          const groupName = groupMetadata.subject;
          const sender = mek.key.participant?.split('@')[0];
          const deleter = update.key.participant?.split('@')[0];

          deleteInfo = `*╭────⬡ PK-XMD ❤‍🔥 ⬡────*
*├♻️ SENDER:* @${sender}
*├👥 GROUP:* ${groupName}
*├⏰ DELETE TIME:* ${deleteTime}
*├🗑️ DELETED BY:* @${deleter}
*├⚠️ ACTION:* Deleted a Message 
*╰💬 MESSAGE:* Content Below 🔽`;
          jid = config.ANTI_DEL_PATH === "inbox" ? conn.user.id : store.jid;
        } else {
          const senderNumber = mek.key.remoteJid?.split('@')[0];
          const deleterNumber = update.key.remoteJid?.split('@')[0];

          deleteInfo = `*╭────⬡ 🤖 PK-XMD ⬡────*
*├👤 SENDER:* @${senderNumber}
*├⏰ DELETE TIME:* ${deleteTime}
*├⚠️ ACTION:* Deleted a Message 
*╰💬 MESSAGE:* Content Below 🔽`;
          jid = config.ANTI_DEL_PATH === "inbox" ? conn.user.id : update.key.remoteJid;
        }

        if (mek.message?.conversation || mek.message?.extendedTextMessage) {
          await DeletedText(conn, mek, jid, deleteInfo, isGroup, update);
        } else {
          await DeletedMedia(conn, mek, jid, deleteInfo);
        }
      }
    }
  }
};

module.exports = {
  DeletedText,
  DeletedMedia,
  AntiDelete,
};
    
