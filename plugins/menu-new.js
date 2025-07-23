const fs = require("fs");
const moment = require("moment-timezone");
const config = require("../config");
const { cmd } = require("../lib");
const path = require("path");

// Fake Verified Contact vCard
const fakeVcard = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    ...(config.fakeNewsletterJid
      ? { remoteJid: config.fakeNewsletterJid }
      : {}),
  },
  message: {
    contactMessage: {
      displayName: "WhatsApp Verified",
      vcard:
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:WhatsApp Verified\n" +
        "ORG:WhatsApp\n" +
        "TEL;type=CELL;type=VOICE;waid=447777777777:+44 7777 777777\n" +
        "END:VCARD",
      jpegThumbnail: fs.readFileSync("./media/logo.jpg"),
    },
  },
};

cmd({
  pattern: "menu",
  desc: "Display full command list",
  category: "system",
  use: "",
  filename: __filename,
}, async (msg) => {
  const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
  const date = moment().tz("Africa/Nairobi").format("dddd, MMMM Do YYYY");

  const menuText = `
*📅 Date:* ${date}
⏰ *Time:* ${time}
🤖 *Bot:* PK-XMD
👤 *Owner:* @${msg.sender.split("@")[0]}

┏━━━❰  🎵 *DOWNLOADER*  ❱━━━┓
★ . *play*
★ . *yt*
★ . *mediafire*
★ . *tiktok*
★ . *fb*
★ . *apk*

┏━━━❰  🧠 *AI COMMANDS*  ❱━━━┓
★ . *ai*
★ . *gpt*
★ . *deepseek*
★ . *openai*

┏━━━❰  🎨 *LOGO MAKER*  ❱━━━┓
★ . *neon*
★ . *glitch*
★ . *blackpink*
★ . *marvel*
★ . *joker*

┏━━━❰  🎭 *FUN ZONE*  ❱━━━┓
★ . *truth*
★ . *dare*
★ . *rate*
★ . *ship*
★ . *simpcard*

┏━━━❰  🖼️ *ANIME ZONE*  ❱━━━┓
★ . *anime*
★ . *waifu*
★ . *neko*
★ . *megumin*
★ . *quote*

┏━━━❰  💬 *REACT & STICKER*  ❱━━━┓
★ . *react*
★ . *sticker*
★ . *emojimix*
★ . *stickermeme*
★ . *take*

┏━━━❰  🧰 *UTILITIES*  ❱━━━┓
★ . *calc*
★ . *shortlink*
★ . *readmore*
★ . *translate*
★ . *weather*

┏━━━❰  🛠️ *CONVERTERS*  ❱━━━┓
★ . *toimg*
★ . *tomp3*
★ . *toaudio*
★ . *toptt*
★ . *tourl*

┏━━━❰  👑 *OWNER CMDS*  ❱━━━┓
★ . *eval*
★ . *exec*
★ . *broadcast*
★ . *setpp*
★ . *shutdown*

┏━━━❰  👥 *GROUP TOOLS*  ❱━━━┓
★ . *tagall*
★ . *promote*
★ . *demote*
★ . *hidetag*
★ . *gpp*
★ . *group open*
★ . *group close*
★ . *kick*
★ . *add*
★ . *gname*
★ . *gdesc*

┏━━━❰  🔐 *SYSTEM*  ❱━━━┓
★ . *menu*
★ . *ping*
★ . *alive*
★ . *uptime*
★ . *status*

`.trim();

  await msg.sendMessage(
    msg.chat,
    {
      image: fs.readFileSync("https://files.catbox.moe/fgiecg.jpg"),
      caption: menuText,
      contextInfo: {
        externalAdReply: {
          title: "PK-XMD WHATSAPP BOT",
          body: "MULTI DEVICE POWERED BY PKDRILLER",
          thumbnail: fs.readFileSync("https://files.catbox.moe/fgiecg.jpg"),
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false,
          sourceUrl: "https://github.com/mejja00254/PK-XMD",
        },
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: config.fakeNewsletterJid || "120363288304618280@newsletter",
          newsletterName: "PK-XMD Official",
          serverMessageId: "",
        },
      },
      quoted: fakeVcard,
    },
    { quoted: fakeVcard }
  );
});
                        
