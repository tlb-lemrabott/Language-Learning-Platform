const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);
const bookUtil = require('./util');


exports.addOne = (req, res) => {
    const languageId = req.params.languageId;
    const newBook = req.body;

    bookUtil._checkLanguageExistence(Language, languageId)
        .then((language) => bookUtil._addBookToLanguage(language, newBook))
        .then((updatedLanguage) => bookUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedLanguage))
        .catch((error) => bookUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), error))
        .finally(() => {
            bookUtil._sendReponse(res);
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
        .then((language) => bookUtil._isLanguageFound(language))
        .then((foundedLanguage) => bookUtil._isBookFound(foundedLanguage, bookId))
        .then((languageBook) => bookUtil._updateOne(languageBook, newBook))
        .then((updatedBook) => bookUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedBook))
        .catch((err) => bookUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => bookUtil._sendReponse(res));
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
    bookUtil._checkLanguageExistence(Language, languageId)
        .then((language) => bookUtil._checkBookExistence(language, bookId))
        .then((book) => bookUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), book))
        .catch((err) => {
            if (err.message === process.env.MSG_LANGUAGE_NOT_FOUND || err.message === process.env.MSG_BOOK_NOT_FOUND) {
                bookUtil._setReponse(parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN), err.message);
            } else {
                bookUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err);
            }
        })
        .finally(() => {
            bookUtil._sendReponse(res);
        });
};

exports.getAll = function (req, res) {
    const languageId = req.params.languageId;
    const offset = parseInt(req.query.offset);
    const count = parseInt(req.query.count);
    bookUtil
        ._validatePaginationParams(req, offset, count)
        .then(([offset, count]) => bookUtil._getLanguageById(Language, languageId, offset, count))
        .then((language) => bookUtil._getBooksInLanguage(language))
        .then((books) => bookUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), books))
        .catch((err) => bookUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => bookUtil._sendReponse(res));
};

exports.delete = function (req, res) {
    const languageId = req.params.languageId;
    const bookId = req.params.bookId;
    bookUtil._checkLanguageExistence(Language, languageId)
        .then((language) => bookUtil._checkBookExistence(language, bookId))
        .then((existedBook) => bookUtil._deleteBookFromLanguage(Language, languageId, bookId, existedBook))
        .then((deletedBook) => bookUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), deletedBook))
        .catch((err) => {
            if (err.message === process.env.MSG_LANGUAGE_NOT_FOUND || err.message === process.env.MSG_BOOK_NOT_FOUND) {
                bookUtil._setReponse(parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN), err.message);
            } else {
                bookUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err);
            }
        })
        .finally(() => {
            bookUtil._sendReponse(res);
        });
};