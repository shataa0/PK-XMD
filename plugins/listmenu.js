const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "listmenu",
  desc: "List all available commands in the bot",
  category: "system",
  filename: __filename
}, async (Void, m) => {
  const botName = "PK-XMD";
  const developer = "Pkdriller";

  const commandsPath = path.join(__dirname); // folder ya commands
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  let allCommands = [];
  let categorized = {};

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
      const fileContent = require(filePath);
      if (Array.isArray(fileContent)) {
        for (const cmd of fileContent) {
          const cmdName = cmd.pattern || "unknown";
          const category = (cmd.category || "Uncategorized").toLowerCase();
          if (!categorized[category]) categorized[category] = [];
          categorized[category].push(cmdName);
          allCommands.push(cmdName);
        }
      } else if (fileContent.pattern) {
        const category = (fileContent.category || "Uncategorized").toLowerCase();
        const cmdName = fileContent.pattern || "unknown";
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push(cmdName);
        allCommands.push(cmdName);
      }
    } catch (err) {
      console.error(`❌ Error loading ${file}: ${err}`);
    }
  }

  const total = allCommands.length;
  let list = `╭━━〔 *${botName} - Command List* 〕━━⬣\n`;
  list += `┃ 👤 Developer: ${developer}\n`;
  list += `┃ 📦 Total Commands: ${total}\n`;
  list += `┃ 🧩 Grouped by category:\n`;

  for (const cat in categorized) {
    list += `┃\n┃ 🔸 *${cat.toUpperCase()}* [${categorized[cat].length}]:\n`;
    categorized[cat].forEach(c => {
      list += `┃   ◦ ${c}\n`;
    });
  }

  list += `╰━━━━━━━━━━━━━━━━━━━━⬣`;

  const fakeContact = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: `${botName} | By ${developer}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${botName} | By ${developer}\nORG:${developer};\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  await Void.sendMessage(m.chat, {
    text: list,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: "PK-XMD Official",
        serverMessageId: 2
      },
      externalAdReply: {
        title: "PK-XMD Command Explorer",
        body: "Explore all commands categorized",
        mediaType: 1,
        showAdAttribution: true,
        sourceUrl: "https://github.com/mejjar00254/PK-XMD"
      }
    }
  }, { quoted: fakeContact });
});
                               
