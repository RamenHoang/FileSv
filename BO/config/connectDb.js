const mongoose = require('mongoose');
const { db } = require('./app');

const connectDb = function () {

    const uri = `${db.dbConnection}://${db.dbUsername}:${db.dbPassword}@${db.dbHost}/${db.dbName}?retryWrites=true&w=majority`;

    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(function (data) {
        console.log('Success');
    })
    .catch(function (err) {
        console.log(err);
    });
}

module.exports = connectDb;
