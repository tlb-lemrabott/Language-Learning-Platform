const mongoose = require('mongoose');
const bookSchema = require('./book');

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