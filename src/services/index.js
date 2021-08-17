const deleteHandler = require('./handlers/deleteCake');
const saveHandler = require('./handlers/saveCake');
const getHandler = require('./handlers/getCakes');
const getImageHandler = require('./handlers/getImage');
const saveImageHandler = require('./handlers/saveImage');
const contentTypeSetter = require('./handlers/contentType');

module.exports = {
    saveCake: async (req, res, next) => {
        try {
            const id = await saveHandler(req.body);
            res.status(200).json({ id });
        } catch (err) {
            next(err);
        }
    },
    saveImage: async (req, res, next) => {
        try {
            const { image } = req.files;
            const { id } = req.params;
            await saveImageHandler({ id, image });
            res.status(200).send({ id });
        } catch (err) {
            next(err);
        }
    },
    getImage: async (req, res, next) => {
        try {
            const { imageUrl } = req.params;
            const returnedImage = await getImageHandler(imageUrl);
            res.header('Content-Type', contentTypeSetter(imageUrl));
            res.status(200).end(returnedImage, 'binary');
        } catch (err) {
            next(err);
        }
    },

    deleteCake: async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await deleteHandler(id);
            res.status(200).end(response);
        } catch (err) {
            next(err);
        }
    },

    getCakes: async (req, res, next) => {
        const { id } = req.params;
        try {
            const data = await getHandler(id);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },
};
