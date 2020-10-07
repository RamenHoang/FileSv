const { fileService } = require('../services/services');

let doUpload = function (req, res) {
    let title = req.body.title;
    let file = req.file;
    let senderId = req.jwtDecoded.data._id;

    fileService.svDoUploadFile(title, file, senderId)
        .then(function (success) {
            res.status(200).send(success);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });
}

let getFiles = function (req, res) {
    let senderId = req.jwtDecoded.data._id;
    let limit;
    try {
        limit = parseInt(req.query.limit);
    } catch (error) {
        return res.status(400).json(error);
    }
    fileService.svGetFiles(senderId, limit)
        .then(function (files) {
            res.status(200).json({ files });
        })
        .catch(function(error) {
            res.status(500).json(error);
        });
}

module.exports = {
    doUpload,
    getFiles
}
