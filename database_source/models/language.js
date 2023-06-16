const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "book title is required!"]
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

const languageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "name is required!"],
      unique: [true, "Duplicate name not allowed!"]
    },
    countries: [String],
    books: [bookSchema]
  });

mongoose.model("Language", languageSchema, "languages");