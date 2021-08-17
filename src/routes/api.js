const express = require('express');
const router = express.Router();
const cakes = require('../services/index');

router.get('/', cakes.getCakes);
router.get('/cake/:id', cakes.getCakes);
router.get('/image/:imageUrl', cakes.getImage);

router.post('/cake', cakes.saveCake);
router.post('/image/:id', cakes.saveImage);

router.delete('/cake/:id', cakes.deleteCake);

module.exports = router;
