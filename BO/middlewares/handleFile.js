const multer = require('multer');
const { app } = require('../config/app');

const fileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, app.fileStorageDir);
    },
    filename: function (req, file, callback) {
        callback(null, `${file.originalname}`);
    }
});

let uploadFile = multer({
    storage: fileStorage
});

module.exports = uploadFile;
