const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);
const util = require('./util');


exports.addOne = (req, res) => {
    const languageId = req.params.languageId;
    const newBook = req.body;

    util._checkLanguageExistence(Language, languageId)
        .then((language) => util._addBookToLanguage(language, newBook))
        .then((updatedLanguage) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedLanguage))
        .catch((error) => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), error))
        .finally(() => {
            util._sendReponse(res);
        });
};

const _globalUpdate = function (req, res) {
    const languageId = req.params.languageId;
    const bookId = req.params.bookId;
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    }
    Language.findById(languageId)
        .then((language) => util._isLanguageFound(language))
        .then((foundedLanguage) => util._isBookFound(foundedLanguage, bookId))
        .then((languageBook) => util._updateOne(languageBook, newBook))
        .then((updatedBook) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedBook))
        .catch((err) => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
};

exports.partialUpdate = function (req, res) {
    return _globalUpdate(req, res);
};

exports.fullUpdate = function (req, res) {
    return _globalUpdate(req, res);
};

exports.getById = function (req, res) {
    const languageId = req.params.languageId;
    const bookId = req.params.bookId;
    util._checkLanguageExistence(Language, languageId)
        .then((language) => util._checkBookExistence(language, bookId))
        .then((book) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), book))
        .catch((err) => {
            if (err.message === process.env.MSG_LANGUAGE_NOT_FOUND || err.message === process.env.MSG_BOOK_NOT_FOUND) {
                util._setReponse(parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN), err.message);
            } else {
                util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err);
            }
        })
        .finally(() => {
            util._sendReponse(res);
        });
};

exports.getAll = function (req, res) {
    const languageId = req.params.languageId;
    const offset = parseInt(req.query.offset);
    const count = parseInt(req.query.count);
    util
        ._validatePaginationParams(req, offset, count)
        .then(([offset, count]) => util._getLanguageById(Language, languageId, offset, count))
        .then((language) => util._getBooksInLanguage(language))
        .then((books) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), books))
        .catch((err) => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
};

exports.delete = function (req, res) {
    const languageId = req.params.languageId;
    const bookId = req.params.bookId;
    util._checkLanguageExistence(Language, languageId)
        .then((language) => util._checkBookExistence(language, bookId))
        .then((existedBook) => util._deleteBookFromLanguage(Language, languageId, bookId, existedBook))
        .then((deletedBook) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), deletedBook))
        .catch((err) => {
            if (err.message === process.env.MSG_LANGUAGE_NOT_FOUND || err.message === process.env.MSG_BOOK_NOT_FOUND) {
                util._setReponse(parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN), err.message);
            } else {
                util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err);
            }
        })
        .finally(() => {
            util._sendReponse(res);
        });
};