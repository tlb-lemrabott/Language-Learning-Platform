const mongoose = require('mongoose');
const Language = mongoose.model(process.env.LAGUAGE_MODEL);


module.exports.addOne = (req, res) =>{
    const languageName = req.params.languageName;
    const newBook = req.body;

    Language.findOne(
        { name: languageName }, 
        function(err, language){
        if(err){
            res.status(500).send('Error while finding language: ' + err);
        } else {
            language.books.push(newBook);
            language.save(function(err, updatedLanguage){
                if(err){
                    res.status(500).send('Error while adding new book: ' + err);
                } else {
                    res.status(200).send(updatedLanguage);
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
                res.status(500).send('Error while updating book: ' + err);
            } else {
                res.status(200).send(language);
            }
        }
    );
}

module.exports.getByName = (req, res) =>{
    const languageName = req.params.languageName;
    const bookName = req.params.bookName;

    Language.findOne({ name: languageName, 'books.title': bookName }, function(err, language){
        if(err){
            res.status(500).send('Error while finding book: ' + err);
        } else {
            const book = language.books.find((book) => book.title === bookName);
            res.status(200).send(book);
        }
    });
}

module.exports.getAll = (req, res) =>{
    const languageName = req.params.languageName;

    Language.findOne({ name: languageName }, function(err, language){
        if(err){
            res.status(500).send('Error while finding language: ' + err);
        } else {
            res.status(200).send(language.books);
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
        function(err, language){
            if(err){
                res.status(500).send(`Error happened while deleting the book ${bookName}` + err);
            } else {
                res.status(200).send(language);
            }
        }
    );
}