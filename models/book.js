const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{type: String,required: true},
    author: {type: String,required: true},
    genre: {type: String,required: true},
    isAvailable: {type: Boolean,required: true},
    numberInStock: { type: Number, required: true},
    yearPublished:{type: Number,required: true}
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);

module.exports.Book = Book;

