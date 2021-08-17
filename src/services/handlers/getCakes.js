const { readData } = require('../../providers/dataProvider');

module.exports = async (id) => {
    const cakeData = await readData();
    return id ? cakeData.find((cake) => cake.id == id) : cakeData;
};
