const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type:String, 
        required: true,
        unique: true
    },
    email:{
        type:String
    },
    password: {
        type:String, 
        required: true
    },
    userType: {
        type: String,
        enum : ['user','admin'],
        default: 'user'                          // 0 ==> admin, 1 ==>user;
    }
});
module.exports = mongoose.model('users', userSchema);

