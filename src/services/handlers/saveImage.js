const { writeImage } = require('../../providers/imageProvider');

module.exports = async ({ id, image }) => {
    const { name, data } = image;
    const imageUrl = `${id}-${name}`;
    await writeImage({ imageUrl, data });
    return true;
};
