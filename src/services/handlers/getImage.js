const { readImage } = require('../../providers/imageProvider');

module.exports = async (imageUrl) => {
    return await readImage(imageUrl);
};
