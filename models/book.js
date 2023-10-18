const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique:true
    },
    authorName: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('Book', BookSchema);
