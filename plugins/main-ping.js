const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "imgurl", "url", "geturl", "upload"],
  react: '🖇',
  desc: "Convert media to Catbox URL",
  category: "utility",
  use: ".tourl [reply to media]",
  filename: __filename
},
async (client, m, text, { quoted, mime, reply }) => {
  try {
    const q = quoted || m.quoted;
    const type = (q.msg || q).mimetype || '';

    if (!type) return reply("Please reply to an image, video or audio.");

    const mediaBuffer = await q.download();
    const tempFilePath = path.join(os.tmpdir(), `pk_upload_${Date.now()}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    let extension = '';
    if (type.includes('jpeg')) extension = '.jpg';
    else if (type.includes('png')) extension = '.png';
    else if (type.includes('video')) extension = '.mp4';
    else if (type.includes('audio')) extension = '.mp3';
    const fileName = 'file' + extension;

    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), fileName);
    form.append('reqtype', 'fileupload');

    const res = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tempFilePath);
    const link = res.data;

    await client.sendMessage(m.chat, {
      text: `*✅ Uploaded Successfully*\n\n🔗 *URL:* ${link}\n📦 *Size:* ${formatBytes(mediaBuffer.length)}\n\n_Powered by Pkdriller_`,
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: "PK-XMD Verification",
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD Verified✅\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nEND:VCARD"
          }
        }
      },
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Bot Channel",
          newsletterJid: "120363025316123456@newsletter"
        }
      }
    });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message || e}`);
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }
      
