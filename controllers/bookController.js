const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);


module.exports.addOne = (req, res) =>{
    const languageName = req.params.languageName;
    const newBook = req.body;

    Language.findOne(
        { name: languageName }, 
        function(err, language){
        if(err){
            res.status(500).send({
                success: false,
                response: `Error while finding language, Error: ${err}`
            });
        } else {
            language.books.push(newBook);
            language.save(function(err, updatedLanguage){
                if(err){
                    res.status(500).send({
                        success: false,
                        response:`Error while adding new book, Error: ${err}`
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        response: updatedLanguage
                    });
                }
            });
        }
    });
}

module.exports.update = (req, res) =>{
    const languageName = req.params.languageName;
    const bookName = req.params.bookName;
    const updatedBook = req.body;

    Language.findOneAndUpdate(
        { name: languageName, 'books.title': bookName },
        { $set: { 'books.$': updatedBook } },
        { new: true },
        function(err, language){
            if(err){
                res.status(500).send({
                    success: false,
                    response: `Error while updating the book ${bookName}, Error: ${err}`
                });
            } else {
                res.status(200).send({
                    success: true,
                    response: language
                });
            }
        }
    );
}

module.exports.getByName = (req, res) =>{
    const languageName = req.params.languageName;
    const bookName = req.params.bookName;

    Language.findOne({ name: languageName, 'books.title': bookName }, function(err, language){
        if(err){
            res.status(500).send({
                success: false,
                message: `Error while finding the book : ${bookName}, Error ${err}`
            });
        } else {
            const book = language.books.find((book) => book.title === bookName);
            res.status(200).send({
                success: true,
                response: book
            });
        }
    });
}

module.exports.getAll = (req, res) =>{
    const languageName = req.params.languageName;

    Language.findOne({ name: languageName }, function(err, language){
        if(err){
            res.status(500).send({
                success: false,
                message: `Error while finding books in language ${languageName}, Error: ${err}`
            });
        } else {
            res.status(200).send({
                success: true,
                response: language.books
            });
        }
    });
}



module.exports.delete = (req, res) =>{
    const languageName = req.params.languageName;
    const bookName = req.params.bookName;

    Language.findOneAndUpdate(
        { name: languageName, 'books.title': bookName },
        { $pull: { books: { title : bookName } } },
        { new: true },
        function(err, result){
            if(err){
                res.status(500).send({
                    success: false,
                    message: `Error happened while deleting the book ${bookName}, Error: ${err}`
                });
            } else {
                res.status(200).send({
                    success: true,
                    response: `book with name ${bookName} deleted successfully from language ${languageName}`
                });
            }
        }
    );
}