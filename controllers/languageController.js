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
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Language.findById(languageId).exec()
        .then((language) => {
            if (!language) {
                response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
                response.message = {
                    "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
                };
            } else {
                response.message = language;
            }
        })
        .catch((err) => {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        })
        .finally(() => {
            res.status(response.status).json(response.message);
        });
}

exports.getAll = function (req, res) {
    const offset = parseInt(req.query.offset);
    const count = parseInt(req.query.count);
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Language.find().skip(offset).limit(count).exec()
        .then((languages) => {
            response.message = languages;
        })
        .catch((err) => {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        })
        .finally(() => {
            console.log(response.message);
            res.status(response.status).json(response.message);
        });
}

exports.deleteById = function (req, res) {
    const languageId = req.params.languageId;
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Language.findByIdAndDelete(languageId).exec()
        .then((deletedLanguage) => {
            if (!deletedLanguage) {
                response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
                response.message = {
                    "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
                };
            } else {
                response.message = deletedLanguage;
            }
        })
        .catch((err) => {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        })
        .finally(() => {
            res.status(response.status).json(response.message);
        })
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