const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd, commands } = require("../command");

cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url", "geturl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL",
  'category': "utility",
  'use': ".tourl [reply to media]",
  'filename': __filename
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

    if (!response.data) {
      throw "Error uploading to Catbox";
    }

    const mediaUrl = response.data;
    fs.unlinkSync(tempFilePath);

    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    await client.sendMessage(message.from, {
      text:
        `*${mediaType} Uploaded Successfully*\n\n` +
        `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
        `*URL:* ${mediaUrl}\n\n` +
        `> © Uploaded by PK-XMD\n` +
        `> Powered by Pkdriller`,
      contextInfo: {
        externalAdReply: {
          title: "PK-XMD • Upload Tool",
          body: "Media to URL Converter",
          thumbnailUrl: 'https://telegra.ph/file/155aeb51b305b39fceabc.jpg',
          sourceUrl: mediaUrl,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        },
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "PKDRILLER™ OFFICIAL"
        },
        mentionedJid: [],
        quotedMessage: {
          contactMessage: {
            displayName: "PKDRILLER",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Driller;Pk;;;\nFN:PKDRILLER\nORG:PK-XMD Developer;\nTEL;type=CELL;type=VOICE;waid=254718241545:+254718241545\nEND:VCARD`
          }
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
      
