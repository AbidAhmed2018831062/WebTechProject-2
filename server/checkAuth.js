const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       // const { username, name } = decoded;
       // console.log(username);
      //  req.username = username;
        //req.name = name;
        next();
    } catch(err) {
        next("Authentication failure!");
    }
};

module.exports = checkLogin;