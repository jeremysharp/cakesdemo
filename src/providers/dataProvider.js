const { dataLocation } = require('../config/dataStore');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    readData: async () => {
        const cakeData = await readFile(dataLocation);
        return JSON.parse(cakeData);
    },
    writeData: async (data) => {
        await writeFile(dataLocation, JSON.stringify(data));
        return true;
    },
};
