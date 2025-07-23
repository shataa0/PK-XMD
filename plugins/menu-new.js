const { cmd } = require("../command")
const config = require("../config")
const axios = require("axios")

cmd({
  pattern: "menu",
  desc: "Show full bot command menu",
  category: "system",
  use: '.menu',
  filename: __filename
}, async (message) => {
  const menuImage = "https://files.catbox.moe/fgiecg.jpg"
  const prefix = '.'

  const text = `
╭━━〔 🤖 *PK-XMD BOT MENU* 〕━━◆
┃📅 Date: *${new Date().toLocaleDateString()}*
┃⏰ Time: *${new Date().toLocaleTimeString()}*
┃🤖 Bot: *PK-XMD-MD*
┃👑 Owner: *pkdriller*
╰━━━━━━━━━━━━━━━━━━━◆

🎵 *DOWNLOADER*
★ . *play*
★ . *yt*
★ . *mediafire*
★ . *tiktok*
★ . *fb*
★ . *apk*

🧠 *AI COMMANDS*
★ . *ai*
★ . *gpt*
★ . *deepseek*
★ . *openai*

🌀 *CONVERTERS*
★ . *photo*
★ . *mp3*
★ . *mp4*
★ . *voice*

😹 *FUN ZONE*
★ . *joke*
★ . *rate*
★ . *meme*
★ . *truth*

📚 *UTILITIES*
★ . *calc*
★ . *ping*
★ . *menu*
★ . *alive*

💬 *REACT & ANIME*
★ . *smile*
★ . *blush*
★ . *wink*
★ . *baka*

📥 *LOGO MAKER*
★ . *logo*
★ . *neon*
★ . *flame*
★ . *glitch*

👮‍♂️ *OWNER COMMANDS*
★ . *block*
★ . *unblock*
★ . *setpp*
★ . *join*

👥 *GROUP TOOLS*
★ . *tagall*
★ . *hidetag*
★ . *kick*
★ . *promote*
★ . *demote*
★ . *antilink*
★ . *antibot*

⚙️ *SYSTEM*
★ . *autoreact*
★ . *anticall*
★ . *autovoice*
★ . *autostatus*
★ . *autoreply*
  `

  const vcard = {
    displayName: "pkdriller",
    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER✓\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=254718241545:+254718241545\nEND:VCARD`
  }

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "pkdriller",
        vcard: vcard.vcard
      }
    }
  }

  const context = {
    quoted: fakeContact,
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363288304618280@newsletter",
        newsletterName: "PK-XMD UPDATES",
        serverMessageId: ""
      },
      externalAdReply: {
        title: "PK-XMD Multi-Device Bot",
        body: "Made by pkdriller ✓",
        thumbnailUrl: menuImage,
        sourceUrl: 'https://github.com/nexustech1911/PK-XMD',
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  }

  await message.send({
    image: { url: menuImage },
    caption: text,
    ...context
  })
})
