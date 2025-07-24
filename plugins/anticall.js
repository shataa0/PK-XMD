const { cmd } = require('../command');

cmd({
  pattern: "anticall",
  desc: "Toggle auto reject/block on incoming calls",
  category: "system",
  filename: __filename
}, async (conn, m, text) => {
  if (!m.isOwner) return m.reply('❌ This command is owner-only.');

  if (text.toLowerCase() === "on") {
    global.ANTICALL1 = true;
    return m.reply("✅ Anticall has been *enabled*.\nBot will auto-reject and block any calls.");
  } else if (text.toLowerCase() === "off") {
    global.ANTICALL1 = false;
    return m.reply("❌ Anticall has been *disabled*.\nBot will no longer block or reject calls.");
  } else {
    return m.reply("⚙️ Usage:\n*anticall on* – Enable\n*anticall off* – Disable");
  }
});
