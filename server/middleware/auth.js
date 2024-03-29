const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // Get Token from Client Cookie
    let token = req.cookies.x_auth;

    // Decode the Token and find User
    User.findByToken(token, (err, user) => {
        if(err)  throw err;
        if(!user)   return res.json({isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next();
    })

    // 유저가 있으면 인증 Okay

    // 유저가 없으면 인증 No
}

module.exports = { auth };