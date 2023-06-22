const mongoose = require('mongoose');
const User = mongoose.model(process.env.USER_MODEL);
const util = require('./util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function _generatedHash(password, salt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

exports.register = (req, res) => {
    bcrypt.genSalt(10)
        .then(salt => _generatedHash(req.body.password, salt))
        .then(passwordHashed => util._fillNewUser(User, req, passwordHashed))
        .then(filledUser => util._validateUser(User, filledUser))
        .then(newUser => util._createUser(User, newUser))
        .then(createdUser => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), createdUser))
        .catch(err => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
};


exports.login = function (req, res) {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then(user => util._checkUserExistence(user))
        .then(user => _comparePassword(password, user.password))
        .catch(err => util._setReponse(parseInt(process.env.REST_API_UNAUTHORIZED_ERROR, process.env.BASE_TEN), err.message))
        .then((user) => _generateToken(user))
        .catch(err => util._setReponse(parseInt(process.env.REST_API_UNAUTHORIZED_ERROR, process.env.BASE_TEN), err.message))
        .finally(() => util._sendReponse(res));
};

function _comparePassword(password, databasePassword) {
    return bcrypt.compare(password, databasePassword)
        .then((isMatch) => handleMatchResult(isMatch, databasePassword));
}

function handleMatchResult(isMatch, databasePassword) {
    if (!isMatch) {
        util._setReponse(
            parseInt(process.env.REST_API_AUTH_ERROR, process.env.BASE_TEN),
            process.env.MSG_INVALID_PASSWORD
        );
        throw new Error(process.env.MSG_INVALID_PASSWORD);
    }
    return databasePassword;
}


function _generateToken(user) {
    const payload = { name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
    util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), { token });
}