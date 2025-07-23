const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const thumbnail = fs.readFileSync(path.join(__dirname, '../media/logo.jpg')); // your logo
const { default: moment } = require("moment-timezone");

const runtime = () => {
  let sec = process.uptime();
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = Math.floor(sec % 60);
  return `${hrs}h ${mins}m ${secs}s`;
};

const hardcodedResponse = (text) => {
  const lower = text.toLowerCase();
  const today = moment().tz('Africa/Nairobi').format('dddd, Do MMMM YYYY');
  const day = moment().tz('Africa/Nairobi').format('dddd');
  const date = moment().tz('Africa/Nairobi').format('DD/MM/YYYY');
  const uptime = runtime();

  if (lower.includes('pk-xmd')) return '🤖 PK-XMD is a powerful WhatsApp Multi-Device bot developed by *PKDRILLER*.';
  if (lower.includes('pkdriller')) return '👨‍💻 PKDRILLER is the developer and maintainer of *PK-XMD*, known for powerful MD WhatsApp bots.';
  if (lower.includes('channel')) return '📢 Official Channel: https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x';
  if (lower.includes('repo')) return '📁 GitHub Repo: https://github.com/mejjar00254/PK-XMD';
  if (lower.includes('today') || lower.includes('date')) return `📆 Today is ${today}`;
  if (lower.includes('day')) return `📅 It's ${day} today.`;
  if (lower.includes('uptime')) return `⏱️ Bot uptime: ${uptime}`;
  return null;
};

const contextInfo = {
  quoted: {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PKDRILLER ✅",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER ✅\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000 000\nEND:VCARD",
        jpegThumbnail: thumbnail
      }
    }
  },
  forwardingScore: 9999,
  isForwarded: true,
  externalAdReply: {
    title: "PK-XMD AI Commands",
    body: "AI + GPT + DeepSeek Integration",
    mediaType: 1,
    thumbnail: thumbnail,
    showAdAttribution: true,
    sourceUrl: "https://github.com/mejjar00254/PK-XMD"
  },
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363254234618280@newsletter",
    newsletterName: "PK-XMD Bot Feed",
    serverMessageId: "",
  }
};

cmd({
  pattern: "ai",
  alias: ["bot", "dj", "gpt", "gpt4", "bing"],
  desc: "Chat with an AI model",
  category: "ai",
  react: "🤖",
  filename: __filename
},
async (conn, mek, m, { q, reply, react }) => {
  try {
    if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

    const special = hardcodedResponse(q);
    if (special) return conn.sendMessage(m.chat, { text: special, contextInfo }, { quoted: mek });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.message) {
      await react("❌");
      return reply("AI failed to respond. Please try again later.");
    }

    await conn.sendMessage(m.chat, { text: `🤖 *AI Response:*\n\n${data.message}`, contextInfo }, { quoted: mek });
    await react("✅");

  } catch (e) {
    console.error("Error in AI command:", e);
    await react("❌");
    reply("An error occurred while communicating with the AI.");
  }
});

cmd({
  pattern: "openai",
  alias: ["chatgpt", "gpt3", "open-gpt"],
  desc: "Chat with OpenAI",
  category: "ai",
  react: "🧠",
  filename: __filename
},
async (conn, mek, m, { q, reply, react }) => {
  try {
    if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

    const special = hardcodedResponse(q);
    if (special) return conn.sendMessage(m.chat, { text: special, contextInfo }, { quoted: mek });

    const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.result) {
      await react("❌");
      return reply("OpenAI failed to respond. Please try again later.");
    }

    await conn.sendMessage(m.chat, { text: `🧠 *OpenAI Response:*\n\n${data.result}`, contextInfo }, { quoted: mek });
    await react("✅");

  } catch (e) {
    console.error("Error in OpenAI command:", e);
    await react("❌");
    reply("An error occurred while communicating with OpenAI.");
  }
});

cmd({
  pattern: "deepseek",
  alias: ["deep", "seekai"],
  desc: "Chat with DeepSeek AI",
  category: "ai",
  react: "🧠",
  filename: __filename
},
async (conn, mek, m, { q, reply, react }) => {
  try {
    if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

    const special = hardcodedResponse(q);
    if (special) return conn.sendMessage(m.chat, { text: special, contextInfo }, { quoted: mek });

    const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.answer) {
      await react("❌");
      return reply("DeepSeek AI failed to respond. Please try again later.");
    }

    await conn.sendMessage(m.chat, { text: `🧠 *DeepSeek AI Response:*\n\n${data.answer}`, contextInfo }, { quoted: mek });
    await react("✅");

  } catch (e) {
    console.error("Error in DeepSeek AI command:", e);
    await react("❌");
    reply("An error occurred while communicating with DeepSeek AI.");
  }
});
      
