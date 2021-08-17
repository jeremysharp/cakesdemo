const { readData, writeData } = require('../../providers/dataProvider');
const { deleteImage } = require('../../providers/imageProvider');

module.exports = async (id) => {
    const cakeData = await readData();
    const index = cakeData.findIndex((cake) => cake.id == id);
    if (index < 0) throw new Error('Cake not found in database');
    const imageUrl = cakeData[index].imageUrl;
    cakeData.splice(index, 1);
    await writeData(cakeData);
    try { 
        await deleteImage(imageUrl);
    } catch(err) {
        return 'removed data only';
    }
    return 'removed data and image';
};
