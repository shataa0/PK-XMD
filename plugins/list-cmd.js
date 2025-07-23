const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
  pattern: "listmenu",
  alias: ["menu2", "help", "list"],
  desc: "Show full bot menu with commands and stats",
  category: "menu",
  react: "📑",
  filename: __filename
}, async (conn, m, msg, { reply }) => {
  try {
    const totalCommands = Object.keys(commands).length;
    let aliasCount = 0;
    Object.values(commands).forEach(cmd => {
      if (cmd.alias) aliasCount += cmd.alias.length;
    });

    const categories = [...new Set(Object.values(commands).map(c => c.category))];
    let menuText = `╭───『 *PK-XMD COMMAND MENU* 』───⳹
│
│ *🤖 Bot:* PK-XMD
│ *👑 Owner:* Pkdriller
│ *📟 Prefix:* .
│ *🕒 Uptime:* ${runtime(process.uptime())}
│
│ *📊 Command Stats:*
│ • Total Commands: ${totalCommands}
│ • Total Aliases: ${aliasCount}
│ • Total Categories: ${categories.length}
│
╰────────────────⳹\n`;

    const categorized = {};
    categories.forEach(cat => {
      categorized[cat] = Object.values(commands).filter(c => c.category === cat);
    });

    for (const [category, cmds] of Object.entries(categorized)) {
      menuText += `\n📁 *${category.toUpperCase()}* [${cmds.length} commands]\n`;
      cmds.forEach(c => {
        menuText += `\n• 🧾 .${c.pattern}`;
        if (c.alias && c.alias.length > 0) menuText += `\n   ↳ Aliases: ${c.alias.map(a => `.${a}`).join(', ')}`;
        if (c.desc) menuText += `\n   ↳ Desc: ${c.desc}`;
        if (c.use) menuText += `\n   ↳ Usage: ${c.use}`;
      });
    }

    menuText += `\n\n> _Powered by Pkdriller_`;

    await conn.sendMessage(
      msg.from,
      {
        text: menuText,
        quoted: {
          key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "120363288304618280@newsletter"
          },
          message: {
            contactMessage: {
              displayName: "PK-XMD",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:PK-XMD;;;\nFN:PK-XMD\nitem1.TEL;waid=254700000000:+254700000000\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
            }
          }
        },
        contextInfo: {
          externalAdReply: {
            title: "PK-XMD Bot",
            body: "Real-time Command List",
            previewType: "NONE",
            mediaType: 1,
            renderLargerThumbnail: false,
            sourceUrl: "https://github.com/pkdriller/PK-XMD"
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
    await reply("❌ Error: " + (err.message || err));
  }
});
        
