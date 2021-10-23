const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    userName: {
        type:String, 
        required: true
    },
    bookName: {
        type:String, 
        required: true,
        minLength: 5,
        maxLength: 20
    },
    author: {
        type:String,
        required: true,
        min: 3,
        max: 15,
        default: 'admin'
    },
    publishedAt:{
        type : Date,
        default: Date.now
    },
    description:{
        type:String
    }
});
module.exports = mongoose.model('book', bookSchema)