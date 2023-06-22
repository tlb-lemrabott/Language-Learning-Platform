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
                    const duplicateErrorMessage = process.env.MONGOOSE_DUPLICATE_LANG_NAME_ERROR;
                    reject(duplicateErrorMessage);
                } else {
                    reject(process.env.MONGODB_VALIDATION_ERROR);
                }
            });
    });
};

exports._validateUser = function (docSchema, newUser) {
    return new Promise((resolve, reject) => {
        const user = new docSchema(newUser);
        user.validate()
            .then(() => resolve(user))
            .catch((error) => {
                if (error.name === process.env.MONGOOSE_INPUT_VALIDATION_ERROR) {
                    console.log("1: ", error.errors.username);
                    const errorMessage = error.errors.username.message;
                    reject(errorMessage);
                } else if (error.name === process.env.MONGO_ERR && error.code === parseInt(process.env.MONGO_ERROR_CODE, process.env.BASE_TEN)) {
                    const duplicateErrorMessage = process.env.MONGOOSE_DUPLICATE_USER_NAME_ERROR;
                    reject(duplicateErrorMessage);
                } else {
                    reject(process.env.MONGODB_VALIDATION_ERROR);
                }
            });
    });
};

exports._fillNewUser= function(docSchema, req, passwordHashed) {
    const newUser = new docSchema({
        name: req.body.name,
        username: req.body.username,
        password: passwordHashed
    });
    return newUser;
}

exports._createUser= function(docSchema, newUser) {
    return docSchema.create(newUser);
}

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

exports._checkUserExistence= function(user) {
    if (!user) {
        this._setReponse(
            parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, process.env.BASE_TEN),
            process.env.REST_API_USER_NOT_FOUND_MESSAGE
        );
        throw new Error(process.env.REST_API_USER_NOT_FOUND_MESSAGE);
    }
    return user;
}

exports._updateOne = function (languageBook, newBook) {
    console.log("_updateOne", languageBook, newBook);
    languageBook.foundBook.set(newBook);
    return languageBook.language.save();
}

exports._isLanguageFound = function (language) {
    return new Promise((resolve, reject) => {
        if (language) {
            resolve(language);
        } else {
            console.log("language not found");
            reject(process.env.MSG_LANGUAGE_NOT_FOUND);
        }
    });
}

exports._isBookFound = function (language, bookId) {
    console.log("_isBookFound");
    return new Promise((resolve, reject) => {
        const foundBook = language.books.find((book) => book._id.toString() == bookId);
        if (!foundBook) {
            console.log(process.env.MSG_BOOK_NOT_FOUND);
            reject(process.env.MSG_BOOK_NOT_FOUND);
        }
        resolve({ foundBook, language });
    });
};

exports._isLanguageFound = function(language){
    return new Promise((resolve, reject) => {
        if (language) {
          resolve(language);
        } else {
          reject(process.env.MSG_LANGUAGE_NOT_FOUND);
        }
      });
}