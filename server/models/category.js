var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// { _id : 13213, userID: 123, name : 'נתבים' }

// Hold category Item.
var categorySchema = new Schema({
    name : String,
    userID : String
});

module.exports = mongoose.model('Categories', categorySchema);