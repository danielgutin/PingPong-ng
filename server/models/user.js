var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : {
        minlength: 3,
        maxlength: 20,
        required: true,
        type : String
    },
    password : {
        minlength: 3,
        required: true,
        type : String
    }
});

module.exports = mongoose.model('User', UserSchema);