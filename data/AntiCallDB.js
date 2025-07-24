const fs = require('fs');
const file = './assets/anticall.json';

const loadAntiCallData = () => {
    if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({}));
    return JSON.parse(fs.readFileSync(file));
};

const saveAntiCallData = (data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

const enableAntiCall = (jid) => {
    const db = loadAntiCallData();
    db[jid] = true;
    saveAntiCallData(db);
};

const disableAntiCall = (jid) => {
    const db = loadAntiCallData();
    delete db[jid];
    saveAntiCallData(db);
};

const isAntiCallEnabled = (jid) => {
    const db = loadAntiCallData();
    return db[jid] === true;
};

const getAllAntiCall = () => loadAntiCallData();

module.exports = {
    enableAntiCall,
    disableAntiCall,
    isAntiCallEnabled,
    getAllAntiCall,
};
      
