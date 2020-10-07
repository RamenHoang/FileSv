const { autService } = require('../services/services');

let doLogin = async function (req, res) {
    let userClient = {};
    userClient.username = req.body.username;
    userClient.password = req.body.password;

    autService.svDoLogin(userClient)
        .then(function (tokens) {
            res.status(200).json(tokens);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

let doRegister = async function (req, res) {

}

let doLogout = function (req, res) {
    res.send('logout');
}

let doRefreshToken = function (req, res) {
    let refreshTokenFromClient = req.body.refreshToken;

    autService.svDoRefreshToken(refreshTokenFromClient)
        .then(function (newAccessToken) {
            res.status(200).json({ newAccessToken });
        })
        .catch(function(error) {
            res.status(500).json(error);
        });
}

module.exports = {
    doLogin,
    doRegister,
    doLogout,
    doRefreshToken
}
