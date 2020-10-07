const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    senderId: { type: String, default: null },
    title: String,
    data: Buffer,
    contentType: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null }
});

FileSchema.statics = {
    createNew(fileItem) {
        return this.create(fileItem);
    },
    getFiles(senderId, limit) {
        return this.find({ senderId: senderId }).sort({ createdAt: -1 }).limit(limit).exec();
    }
}

module.exports = mongoose.model('fileModel', FileSchema);
