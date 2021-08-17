const { readData, writeData } = require('../../providers/dataProvider');

const getMaxId = (data) => (data.length ? Math.max(...data.map((c) => c.id)) : 0);

module.exports = async (cake) => {
    const cakeData = await readData();
    const cakeToSave = { ...cake, modified: new Date() };
    const id = cakeToSave.id || getMaxId(cakeData) + 1;
    // ensure unique images by prefixing ID
    if (cake.image) {
        cakeToSave.imageUrl = `${id}-${cakeToSave.image}`;
        delete cake.image;
    }
    if (!cakeToSave.id) {
        // new cake
        cakeData.push({ ...cakeToSave, id, created: new Date() });
    } else {
        // existing cake
        const cakeIndex = cakeData.findIndex((c) => c.id === cakeToSave.id);
        cakeIndex > -1 ? (cakeData[cakeIndex] = { ...cakeData[cakeIndex], ...cakeToSave }) : cakeData.push(cakeToSave);
    }
    await writeData(cakeData);
    return id;
};
