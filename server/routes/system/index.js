// Express & Router
var express = require('express');
var router = express.Router();

// System Controller funcs.
const systemController = require('../../controllers/system');


// get list of categories by userID
router.post('/category_list', systemController.categoryList );

// add new category.
router.post('/add_category', systemController.addCategory);

// remove category / sub category Functionallity.
router.post('/remove_category', systemController.removeCategory );

// edit current category / sub category.
router.post('/edit_category', systemController.editCategory );

// Add sub category by userID.
router.post('/add_sub_category', systemController.addSubCategory);

// get list of records by category ID.
router.post('/get_records_by_category', systemController.getRecordsByCategory)

// get list of records by category ID.
router.post('/get_records_by_sub_category', systemController.getRecordsBySubCategory)

// add new record to category / sub category.
router.post('/add_record', systemController.addRecord)

// remove record from sub category / category.
router.post('/remove_record', systemController.removeRecord)

// Edit record details.
router.post('/edit_record', systemController.editRecord)

// Handle List of pings.
router.post('/get_pings', systemController.checkPings)

module.exports = router;
