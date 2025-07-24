cmd({
  pattern: "quranmenu",
  alias: ["surahmenu", "surahlist"],
  desc: "List of Quran Surahs",
  category: "menu",
  react: "❤️",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const fakeContact = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "PK-XMD • Official",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD\nORG:PK-XMD Verified Bot;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
          jpegThumbnail: null
        }
      }
    };

    let dec = `❤️  ⊷┈ *QURAN KAREEM* ┈⊷  🤍

💫 𝘈𝘭𝘭 𝘴𝘶𝘳𝘢𝘩 𝘯𝘢𝘮𝘦𝘴 𝘢𝘯𝘥 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 
𝘛𝘺𝘱𝘦 *.surah 36* 𝘵𝘰 𝘳𝘦𝘢𝘥 𝘢 𝘴𝘶𝘳𝘢𝘩 💫🌸

1. 🕌 Al-Fatiha (الفاتحہ)
2. 🐄 Al-Baqarah (البقرہ)
3. 🏠 Aali Imran (آل عمران)
...
114. 🌐 An-Nas (الناس)`;

    await conn.sendMessage(
      from,
      {
        image: { url: `https://files.catbox.moe/8fy6up.jpg` },
        caption: dec,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363288304618280@newsletter',
            newsletterName: 'PK-XMD',
            serverMessageId: 143
          }
        }
      },
      { quoted: fakeContact }
    );

  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
