const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

cmd({
  pattern: "menu2",
  alias: ["help", "commands"],
  desc: "Show all available bot commands",
  category: "main",
  filename: __filename,
  react: "📖"
},
async (conn, mek, m, { reply }) => {
  try {
    const commandFolder = path.join(__dirname); // Adjust if your commands are in another folder
    const files = fs.readdirSync(commandFolder).filter(f => f.endsWith('.js'));

    let menuText = `╭───〈 🧠 *PK-XMD COMMANDS* 〉───⬣\n`;

    for (const file of files) {
      const content = fs.readFileSync(path.join(commandFolder, file), 'utf8');
      const matches = [...content.matchAll(/pattern:\s*["'`](.*?)["'`]/g)];
      if (matches.length > 0) {
        const extracted = matches.map(x => x[1]);
        menuText += `\n📁 *${file}*\n`;
        extracted.forEach(cmd => {
          if (cmd && cmd.trim()) {
            menuText += `╰➤ \`${cmd.trim()}\`\n`;
          }
        });
      }
    }

    menuText += `\n╰── 〈 🔰 *Powered by Pkdriller* 〉 ──⬣`;

    await reply(menuText);
  } catch (err) {
    console.error("Menu Error:", err);
    reply("⚠️ Error generating menu. Check command files.");
  }
});
