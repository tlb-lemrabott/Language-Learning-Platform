const mongoose = require('mongoose');
//const bookSchema = require('./book');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const languageShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    countries: [String],
    books: [bookSchema]
});

mongoose.model("Language", languageShema, "languages");
// mongoose.model("Book", bookSchema, "books");