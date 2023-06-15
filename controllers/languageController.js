const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);
const util = require('./util');

exports.addOne = (req, res) => {
    const language = {
        name: req.body.name,
        countries: req.body.countries,
        books: req.body.books
    };
    util._validateLanguage(Language, language)
        .then(validatedLanguage => Language.create(validatedLanguage))
        .then(createdLanguage => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), createdLanguage))
        .catch(err => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res))
};

exports.fullUpdate = function (req, res) {
    const languageId = req.params.languageId;
    const newLanguage = req.body;
    Language.findOneAndReplace({ _id: languageId }, newLanguage, { new: true, overwrite: true })
        .then((updatedLanguage) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedLanguage))
        .catch((err) => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
};

exports.partialUpdate = function (req, res) {
    const languageId = req.params.languageId;
    const newLanguage = req.body;
    Language.findByIdAndUpdate(languageId, newLanguage, { new: true })
        .then((updatedLanguage) => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedLanguage))
        .catch((err) => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
};


exports.getById = function (req, res) {
    const languageId = req.params.languageId;
    Language.findById(languageId)
        .then((language) => {
            if (!language) {
                util._setReponse(
                    parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN),
                    process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
                );
            } else {
                util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), language)
            }
        })
        .catch(err => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
}

exports.getAll = function (req, res) {
    const offset = parseInt(req.query.offset);
    const count = parseInt(req.query.count);
    util
        ._validatePaginationParams(req, offset, count)
        .then(([offset, count]) => util._getLanguages(Language, offset, count))
        .then(languages => util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), languages))
        .catch(err => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
}

exports.deleteById = function (req, res) {
    const languageId = req.params.languageId;
    Language.findByIdAndDelete(languageId)
        .then((deletedLanguage) => {
            if (!deletedLanguage) {
                util._setReponse(
                    parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN),
                    process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
                );
            } else {
                util._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), deletedLanguage)
            }
        })
        .catch(err => util._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => util._sendReponse(res));
};

exports.getLanguageDocumentSize = function (req, res) {
    Language.countDocuments().then(
        (sizeValue) => {
            res.status(200).send(sizeValue)
        })
        .catch((err) => {
            "Error:", err
        });
};