const fileModel = require('../models/fileModel');
const fsExtra = require('fs-extra');
const { app } = require('../config/app');

let svDoUploadFile = function (title, file, senderId) {
    return new Promise(async function (resolve, reject) {
        try {
            let newFileItem = {};
            newFileItem.senderId = senderId;
            newFileItem.title = title;
            newFileItem.contentType = file.mimetype;
            newFileItem.data = await fsExtra.readFile(file.path);
            let uploadedFile = await fileModel.createNew(newFileItem);

            fsExtra.remove(file.path);

            if (uploadedFile)
                return resolve(`File <b>${newFileItem.title}</b> uploaded!`);
            else 
                return reject('Someting went wrong!');
        } catch (error) {
            fsExtra.remove(file.path);
            return reject(error);
        }
    })
}

let svGetFiles = function(senderId, limit) {
    return new Promise(async function(resolve, reject) {
        try {
            let filesFromDb = await fileModel.getFiles(senderId, limit);
            if (filesFromDb.length > 0)
                return resolve(filesFromDb);
            else
                return reject('You <b>haven\'t uploaded</b> any file');
        } catch(error) {
            return reject(error);
        }
    });
}

module.exports = {
    svDoUploadFile,
    svGetFiles
}
