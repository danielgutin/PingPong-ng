var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// { catID : 13213, id: 1110, name : 'צפון' }

// Hold category Item.
var subCategorySchema = new Schema({
    userID : String,
    catID : String,
    name : String
});

module.exports = mongoose.model('SubCategory', subCategorySchema);