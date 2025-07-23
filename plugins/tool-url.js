const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "imgurl", "url2", "geturl", "upload"],
  react: '🖇',
  desc: "Convert media to Catbox URL",
  category: "utility",
  use: ".tourl [reply to media]",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType) {
      throw "Please reply to an image, video, or audio file";
    }

    const mediaBuffer = await quotedMsg.download();
    const tempFilePath = path.join(os.tmpdir(), `catbox_upload_${Date.now()}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else if (mimeType.includes('video')) extension = '.mp4';
    else if (mimeType.includes('audio')) extension = '.mp3';
    
    const fileName = `file${extension}`;

    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), fileName);
    form.append('reqtype', 'fileupload');

    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    if (!response.data) throw "Error uploading to Catbox";

    const mediaUrl = response.data;
    fs.unlinkSync(tempFilePath);

    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    await client.sendMessage(message.chat, {
      text:
        `*${mediaType} Uploaded Successfully*\n\n` +
        `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
        `*URL:* ${mediaUrl}\n\n` +
        `> _Powered by Pkdriller_`,
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "120363288304618280@newsletter",
        },
        message: {
          contactMessage: {
            displayName: "PK-XMD",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:PK-XMD;;;\nFN:PK-XMD\nitem1.TEL;waid=254700000000:+254700000000\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
          },
        },
      },
      contextInfo: {
        externalAdReply: {
          title: "PK-XMD WhatsApp Bot",
          body: "Uploaded via PK-XMD",
          mediaType: 1,
          previewType: "PHOTO",
          renderLargerThumbnail: true,
          thumbnailUrl: "https://telegra.ph/file/cb18cd65f6762b6fe7472.jpg",
          sourceUrl: "https://github.com/pkdriller/PK-XMD"
        },
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Official",
          newsletterJid: "120363288304618280@newsletter"
        }
      }
    });

  } catch (error) {
    console.error(error);
    await reply(`Error: ${error.message || error}`);
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }
  
