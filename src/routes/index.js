const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(process.cwd(), 'client/build/index.html'))
    } catch(error) {
        next(error)
    }
})
module.exports = router;
