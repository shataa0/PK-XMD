const { cmd } = require("../command");
const axios = require('axios');
const fs = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../data/updateDB');

cmd({
  pattern: "update",
  alias: ["upgrade", "sync"],
  react: '🧬',
  desc: "Update the bot to the latest version.",
  category: "system",
  filename: __filename
}, async (conn, m, text, { reply, isOwner }) => {
  if (!isOwner) return reply("❌ Only the owner can perform an update.");

  try {
    await reply("🔍 Checking for PK-XMD updates...");

    // Get latest commit from GitHub API
    const { data } = await axios.get('https://api.github.com/repos/mejjar00254/PK-XMD/commits/main');
    const latestHash = data.sha;

    const currentHash = await getCommitHash();
    if (currentHash === latestHash) {
      return reply("✅ PK-XMD is already up-to-date.");
    }

    await reply("🚀 Update available! Downloading new files...");

    const zipUrl = "https://github.com/mejjar00254/PK-XMD/archive/refs/heads/main.zip";
    const zipPath = path.join(__dirname, "pkxmd_update.zip");
    const { data: zipData } = await axios.get(zipUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(zipPath, zipData);

    const extractPath = path.join(__dirname, 'update_extract');
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    await reply("📦 Extracting and replacing files...");

    const source = path.join(extractPath, "PK-XMD-main");
    const destination = path.join(__dirname, '..');
    copyFolderSync(source, destination);

    await setCommitHash(latestHash);

    fs.unlinkSync(zipPath);
    fs.rmSync(extractPath, { recursive: true, force: true });

    await reply("✅ Update complete! Restarting PK-XMD...");
    process.exit(0);

  } catch (err) {
    console.error(err);
    return reply("❌ Update failed. Try manually or check logs.");
  }
});

// Copy folders but skip personal settings
function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

  const items = fs.readdirSync(source);
  for (const item of items) {
    const src = path.join(source, item);
    const dest = path.join(target, item);

    if (["config.js", "app.json", "session", "auth_info"].includes(item)) {
      console.log(`🔒 Skipping ${item}`);
      continue;
    }

    if (fs.lstatSync(src).isDirectory()) {
      copyFolderSync(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
                             
                          
