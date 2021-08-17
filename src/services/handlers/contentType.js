module.exports = (file) => {
    switch (file.substring(file.lastIndexOf('.'))) {
        case '.jpg':
            return 'image/jpeg';
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        default:
            return 'image/unknown';
    }
};
