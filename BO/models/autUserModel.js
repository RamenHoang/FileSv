const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AutUserSchema = new Schema({
    username: String,
    password: String,
    role: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null }
});

AutUserSchema.statics = {
    createNew(autUserItem) {
        return this.create(autUserItem);
    }
}

module.exports = mongoose.model('autUser', AutUserSchema);
