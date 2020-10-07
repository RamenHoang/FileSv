const autUserModel = require('../models/autUserModel');
const jwtHelper = require('../helpers/jwtHelper');
const { jwt } = require('../config/app');
const md5 = require('md5');
const { array } = require('../middlewares/handleFile');

const accessTokenLife = jwt.accessTokenLife;
const refreshTokenLife = jwt.refreshTokenLife;
const accessTokenSecret = jwt.accessTokenSecret;
const refreshTokenSecret = jwt.refreshTokenSecret;

let tokenList = {};

let svDoLogin = function (user) {
    return new Promise(async function (resolve, reject) {
        try {
            user.password = md5(user.password);
            let userFromDb = await autUserModel.findOne(
                {
                    username: user.username,
                    password: user.password
                },
                {
                    _id: 1,
                    username: 1,
                    role: 1
                }
            ).exec();

            if (userFromDb) {
                userFromDb._id = `${userFromDb._id}`; // _id: Object -> String
                let accessTokenPromise = jwtHelper.generateToken(userFromDb, accessTokenSecret, accessTokenLife);
                let refreshTokenPromise = jwtHelper.generateToken(userFromDb, refreshTokenSecret, refreshTokenLife);
                const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);
                tokenList[refreshToken] = { accessToken };
                return resolve({ accessToken, refreshToken });
            }
        } catch (error) {
            return reject(error);
        }
    });
}

let svDoRefreshToken = function (refreshTokenFromClient) {
    return new Promise(async function (resolve, reject) {
        if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
            try {
                const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
                const userInfo = decoded.data;
                const accessToken = await jwtHelper.generateToken(userInfo, accessTokenSecret, accessTokenLife);
                tokenList[refreshTokenFromClient] = { accessToken };
                return resolve(accessToken);
            } catch (error) {
                return reject('Invalid refresh token');
            }
        }
        return reject('No token provided');
    });
}

module.exports = {
    svDoLogin,
    svDoRefreshToken
}
