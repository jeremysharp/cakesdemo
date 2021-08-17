const { imageLocation } = require('../config/dataStore');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

module.exports = {
    readImage: async (imageUrl) => {
        const image = await readFile(imageLocation + imageUrl);
        return image;
    },
    writeImage: async ({ imageUrl, data }) => {
        await writeFile(imageLocation + imageUrl, data);
        return;
    },
    deleteImage: async (imageUrl) => {
        await deleteFile(imageLocation + imageUrl);
        return;
    },
};
