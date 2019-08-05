var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Hold category Item.
var recordSchema = new Schema({
    name : String,
    ip : String,
    categoryID : String,
    subCategoryID : String,
    status : {
        type : String,
        default : 'מאתחל'
    },
    userID: String
});

module.exports = mongoose.model('Records', recordSchema);