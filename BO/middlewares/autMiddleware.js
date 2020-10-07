const jwtHelper = require("../helpers/jwtHelper")
const { jwt } = require('../config/app');

const accessTokenSecret = jwt.accessTokenSecret;

let canAuthenticate = async function (req, res, next) {
    const clientToken = req.body.token || req.query.token || req.headers['authentication'];

    console.log(req.headers);

    if (clientToken) {
        try {
            const decodeToken = await jwtHelper.verifyToken(clientToken, accessTokenSecret);
            req.jwtDecoded = decodeToken;
            return next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    } else
        res.status(403).json({ message: 'No token provided' });
}

module.exports = {
    canAuthenticate
}
