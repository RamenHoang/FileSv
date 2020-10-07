const jwt = require('jsonwebtoken');

let generateToken = function(user, secretSignature, tokenLife) {
    return new Promise(function(resolve, reject) {
        const userData = {};
        userData._id = user._id;
        userData.username = user.username;
        userData.role = user.role;

        jwt.sign(
            {data: userData},
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            },
            function(err, token) {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            }
        );
    });
}

let verifyToken = function(token, secretKey) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, secretKey, function(err, decodeToken) {
            if (err) {
                return reject(err);
            }
            resolve(decodeToken);
        });
    });
}

module.exports = {
    generateToken,
    verifyToken
}
