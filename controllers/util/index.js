const response = {
    status: parseInt(process.env.REST_API_OK, process.env.BASE_TEN),
    message: ''
};

exports._setReponse = function (status, message) {
    response.status = status;
    response.message = message;
    console.log("_setReponse: ", response);
}

exports._sendReponse = function (res) {
    console.log("_sendReponse: ", response);
    return res.status(response.status).json(response.message);
}

exports._validateLanguage = function (docSchema, language) {
    return new Promise((resolve, reject) => {
        const lang = new docSchema(language);
        lang.validate()
            .then(() => resolve(lang))
            .catch((error) => {
                console.log("1", error);
                if (error.name === process.env.MONGOOSE_INPUT_VALIDATION_ERROR) {
                    const errorMessage = error.errors.name.message;
                    reject(errorMessage);
                } else if (error.name === process.env.MONGO_ERR && error.code === parseInt(process.env.MONGO_ERROR_CODE, process.env.BASE_TEN)) {
                    const duplicateErrorMessage = process.env.MONGOOSE_DUPLICATE_ERROR_MSG;
                    reject(duplicateErrorMessage);
                } else {
                    reject(process.env.MONGODB_VALIDATION_ERROR);
                }
            });
    });
};

exports._addBookToLanguage = function (language, newBook) {
    language.books.push(newBook);
    return language.save();
};

exports._getBooksInLanguage = function (languages) {
    return new Promise((resolve, reject) => {
        resolve(languages.books);
    });
}

exports._getLanguageById = function (docSchema, languageId, offset, count) {
    return docSchema.findById(languageId)
        .skip(offset)
        .limit(count)
}

exports._getLanguages = function (docSchema, offset, count) {
    return docSchema.find()
        .skip(offset)
        .limit(count)
}

exports._checkLanguageExistence = function (docSchema, languageId) {
    return docSchema.findById(languageId)
        .then((language) => {
            if (language) {
                return language;
            } else {
                throw new Error(process.env.MSG_LANGUAGE_NOT_FOUND);
            }
        });
}

exports._checkBookExistence = function (language, bookId) {
    const book = language.books.find((book) => book._id == bookId);
    if (book) {
        return book;
    } else {
        throw new Error(process.env.MSG_BOOK_NOT_FOUND);
    }
}


exports._updateBookOfLanguage = function () {

};


exports._deleteBookFromLanguage = function (docSchema, languageId, bookId, book) {
    return docSchema.findByIdAndUpdate(
        languageId,
        { $pull: { books: { _id: bookId } } },
        { new: true }
    ).then((updatedLanguage) => {
        if (updatedLanguage) {
            return book;
        } else {
            throw new Error(process.env.MSG_LANGUAGE_NOT_FOUND);
        }
    });
};

exports._validatePaginationParams = function (req, offset, count) {
    let defaultOffset = parseInt(process.env.DEFAULT_FIND_OFFSET, process.env.BASE_TEN);
    let defaultCount = parseInt(process.env.DEFAULT_FIND_COUNT, process.env.BASE_TEN);
    return new Promise((resolve, reject) => {
        if (req.query && offset) {
            if (isNaN(offset)) {
                util._setResponse(
                    parseInt(process.env.REST_API_USER_ERROR, process.env.BASE_TEN),
                    process.env.MSG_WRONG_VALUE_TYPE_OF_OFFSET);
                return;
            } else {
                defaultOffset = offset;
            }
        }
        if (req.query && count) {
            if (isNaN(count)) {
                util._setResponse(
                    parseInt(process.env.REST_API_USER_ERROR, process.env.BASE_TEN),
                    process.env.MSG_WRONG_VALUE_TYPE_OF_COUNT);
                return;
            } else {
                defaultCount = count;
            }
        }
        if (count > parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.BASE_TEN)) {
            util._setReponse(
                parseInt(process.env.REST_API_USER_ERROR, process.env.BASE_TEN),
                parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.BASE_TEN)
            );
            reject();
            return;
        }
        resolve([defaultOffset, defaultCount]);
    });
}