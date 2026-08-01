const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/users')
const middleWareFn = (req, res, next) => {
    try {
        const { refreshToken } = req.signedCookies
        if(!refreshToken){
            throw new Error(`invalid token`)
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_Refresh_Secret)
        if (!decoded) {
            throw new Error(`invalid token`);
        }
        console.log(decoded)
        req.user = decoded;
        next();
    }
    catch(err){
        next(err)
    }
}
module.exports = { middleWareFn }