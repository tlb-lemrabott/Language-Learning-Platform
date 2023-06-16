const jwt = require('jsonwebtoken');


const authenticate = function (req, res, next) {
    const headerExist = req.headers.authorization;
    let token = "";
    if (headerExist) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(parseInt(process.env.REST_API_UNAUTHORIZED_ERROR, process.env.BASE_TEN))
            .json({ message: process.env.MSG_INVALID_AUTHORIZATION });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(parseInt(process.env.REST_API_UNAUTHORIZED_ERROR, process.env.BASE_TEN))
            .json({ message: process.env.MSG_INVALID_TOKEN });
    }
};




module.exports = authenticate;