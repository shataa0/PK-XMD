const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, 'bot-settings.json');

// Ensure the settings file exists
if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify({}));
}

// Load settings from file
let settings = JSON.parse(fs.readFileSync(settingsPath));

const saveSettings = () => {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
};

module.exports = {
    getSetting: (key) => {
        return settings[key] ?? false;
    },
    setSetting: (key, value) => {
        settings[key] = value;
        saveSettings();
    },
    getAllSettings: () => {
        return settings;
    }
};
