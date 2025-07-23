const { cmd } = require('../command')
const config = require('../config')
const moment = require('moment-timezone')
const axios = require('axios')

cmd({
  pattern: "menu",
  alias: ["help"],
  desc: "Show full command list",
  category: "general",
  filename: __filename
}, async (message) => {
  const { senderName } = message
  const time = moment().tz(config.TIME_ZONE).format("HH:mm:ss")
  const date = moment().tz(config.TIME_ZONE).format("DD/MM/YYYY")
  const runtime = function(seconds) {
    seconds = Number(seconds)
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)
    return `${d}d ${h}h ${m}m ${s}s`
  }

  const uptime = runtime(process.uptime())

  const thumb = await axios.get("https://files.catbox.moe/fgiecg.jpg", { responseType: 'arraybuffer' })
  const imageBuffer = Buffer.from(thumb.data, 'binary')

  const text = `
╭─────────────◆
│  *PK-XMD - MULTI DEVICE*
├─────────────────────
│ 🤖 *Name:* ${config.BOT_NAME}
│ 🧑‍💻 *Owner:* ${config.OWNER_NAME}
│ 🌐 *Uptime:* ${uptime}
│ 🗓️ *Date:* ${date}
│ 🕒 *Time:* ${time}
╰─────────────◆

🧠 *AI COMMANDS*
★ . *ai*
★ . *gpt*
★ . *openai*
★ . *deepseek*

🎵 *DOWNLOADER*
★ . *play*
★ . *yt*
★ . *ytmp4*
★ . *ytmp3*
★ . *mediafire*
★ . *apk*
★ . *fb*
★ . *tiktok*
★ . *ig*

🔄 *CONVERTERS*
★ . *toimg*
★ . *tomp3*
★ . *sticker*
★ . *photo*

🌸 *ANIME ZONE*
★ . *anime*
★ . *wallpaper*
★ . *neko*
★ . *waifu*

😂 *REACTIONS*
★ . *kiss*
★ . *hug*
★ . *pat*
★ . *cry*

🧰 *UTILITIES*
★ . *ssweb*
★ . *shortlink*
★ . *weather*
★ . *calc*

🎉 *FUN ZONE*
★ . *truth*
★ . *dare*
★ . *rate*
★ . *ship*

🖌️ *LOGO MAKER*
★ . *logo*
★ . *blackpink*
★ . *neon*
★ . *glitch*

👑 *OWNER COMMANDS*
★ . *block*
★ . *unblock*
★ . *setpp*
★ . *setbio*
★ . *join*

👥 *GROUP TOOLS*
★ . *tagall*
★ . *promote*
★ . *demote*
★ . *hidetag*
★ . *antilink*
★ . *antibot*
★ . *group*

⚙️ *SYSTEM COMMANDS*
★ . *ping*
★ . *menu*
★ . *alive*
★ . *script*
★ . *runtime*

──────────────◆
🔰 *PK-XMD | 2025*
`

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PK-XMD Verified Bot",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD Verified Bot✓\nORG:PK-XMD Team;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000 000\nEND:VCARD`
      }
    }
  }

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterName: "PK-XMD Broadcast",
      newsletterJid: "120363288304618280@newsletter"
    },
    externalAdReply: {
      title: "PK-XMD Multi Device Bot",
      body: config.OWNER_NAME,
      mediaType: 1,
      thumbnail: imageBuffer,
      mediaUrl: '',
      sourceUrl: 'https://github.com/mejja00254/PK-XMD'
    }
  }

  await message.send(
    imageBuffer,
    {
      caption: text.trim(),
      quoted: fakeContact,
      contextInfo
    },
    "image"
  )
})
               
