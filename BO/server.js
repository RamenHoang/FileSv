const express = require('express');
const bodyParser = require('body-parser');
const initAPIs = require('./routes/api');
const connectDb = require('./config/connectDb');

const app = express();
connectDb();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
initAPIs(app);

const hostname = 'localhost';
const port = 8000;

app.listen(port, hostname, function () {
    console.log(`Server is running at ${hostname}:${port}/`);
});


const terminator = function (sig) {
    if (typeof sig === "string") {
        console.log('%s: Received %s - terminating sample app ...', Date(Date.now('UTC+7')), sig);
        process.exit(1);
    }
};

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function (element) {
    process.on(element, function () { terminator(element); });
});
