const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const fs = require('fs');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
  pattern: "menu2",
  alias: ["allmenu", "fullmenu"],
  use: '.menu2',
  desc: "Show all bot commands dynamically",
  category: "menu",
  react: "📜",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const commandDir = path.join(__dirname, '../plugins');
    const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

    let totalCommands = 0;
    let commandList = [];

    for (const file of commandFiles) {
      const filePath = path.join(commandDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = [...content.matchAll(/pattern:\s*["'`](.*?)["'`]/g)].map(x => x[1]);

      if (matches.length) {
        totalCommands += matches.length;
        commandList.push(`📁 *${file}*\n${matches.map(cmd => `★ *${cmd}*`).join('\n')}`);
      }
    }

    // Invisible character for readmore effect
    const readMore = String.fromCharCode(8206).repeat(4001);

    let dec = `*╭────⬡ ${config.BOT_NAME} ⬡────⭓*\n` +
      `*├▢ 🤖 Owner:* ${config.OWNER_NAME}\n` +
      `*├▢ 📜 Commands:* ${totalCommands}\n` +
      `*├▢ ⏱️ Runtime:* ${runtime(process.uptime())}\n` +
      `*├▢ 📡 Baileys:* Multi Device\n` +
      `*├▢ ☁️ Platform:* Heroku\n` +
      `*├▢ ⚙️ Mode:* ${config.MODE}\n` +
      `*├▢ 🏷️ Version:* 5.0.0 Bᴇᴛᴀ\n` +
      `*╰─────────────────⭓*\n\n` +
      readMore + '\n' + // Read More Here
      commandList.join('\n\n') +
      `\n\n${config.DESCRIPTION}`;

    // Fake verified vCard as quoted message
    const fakeContact = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        ...(from ? { remoteJid: from } : {})
      },
      message: {
        contactMessage: {
          displayName: `${config.OWNER_NAME}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${config.OWNER_NUMBER}\nEND:VCARD`
        }
      }
    };

    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/7zfdcq.jpg' },
      caption: dec,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363354023106228@newsletter',
          newsletterName: config.BOT_NAME,
          serverMessageId: 143
        }
      }
    }, { quoted: fakeContact });

  } catch (e) {
    console.log(e);
    reply(`Error: ${e}`);
  }
});
      
