const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);
const languageUtil = require('./util');

exports.addOne = (req, res) => {
    // const language = {
    //     name: req.body.name,
    //     countries: req.body.countries,
    //     books: req.body.books
    // };
     
    const language = req.body;
    
    console.log(req.body);
    languageUtil._validateLanguage(Language, language)
        .then(validatedLanguage => Language.create(validatedLanguage))
        .then(createdLanguage => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), createdLanguage))
        .catch(err => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res))
};

exports.fullUpdate = function (req, res) {
    const languageId = req.params.languageId;
    const newLanguage = req.body;
    Language.findOneAndReplace({ _id: languageId }, newLanguage, { new: true, overwrite: true })
        .then((updatedLanguage) => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedLanguage))
        .catch((err) => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res));
};

exports.partialUpdate = function (req, res) {
    const languageId = req.params.languageId;
    const newLanguage = req.body;
    Language.findByIdAndUpdate(languageId, newLanguage, { new: true })
        .then((updatedLanguage) => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), updatedLanguage))
        .catch((err) => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res));
};

exports.getById = function (req, res) {
    const languageId = req.params.languageId;
    Language.findById(languageId)
        .then((language) => languageUtil._isLanguageFound(language))
        .then((foundLanguage) => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), foundLanguage))
        .catch(err => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res));
}

exports.getAll = function (req, res) {
    const offset = parseInt(req.query.offset);
    const count = parseInt(req.query.count);
    languageUtil
        ._validatePaginationParams(req, offset, count)
        .then(([offset, count]) => languageUtil._getLanguages(Language, offset, count))
        .then(languages => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), languages))
        .catch(err => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res));
}

exports.deleteById = function (req, res) {
    const languageId = req.params.languageId;
    Language.findByIdAndDelete(languageId)
        .then((language) => languageUtil._isLanguageFound(language))
        .then((deletedLanguage) => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), deletedLanguage))
        .catch(err => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res));
};

exports.getTotalCount = function (req, res) {
    Language.countDocuments()
        .then((size) => languageUtil._setReponse(parseInt(process.env.REST_API_OK, process.env.BASE_TEN), size))
        .catch(err => languageUtil._setReponse(parseInt(process.env.REST_API_SYSTEM_ERROR, process.env.BASE_TEN), err))
        .finally(() => languageUtil._sendReponse(res));
};