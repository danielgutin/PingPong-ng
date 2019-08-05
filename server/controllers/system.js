// Models.
const CategoryModel = require('../models/category');
const SubCategoryModel = require('../models/subcategory');
const recordModel = require('../models/record');

// cmd access for ping operations.
var exec = require('child_process').exec;
var ping = require('ping');

module.exports = systemController = {

    // --- Create new Category.
    addCategory : async (req, res) => {
        // --- Check if category with same name exist.
        let found = await CategoryModel.findOne({ name : req.body.name })
        if(found) {
            res.status(400).send('Category name already Exist');
        }else {
            // --- creating the new category.
            let newCategory = new CategoryModel({
                name : req.body.name,
                userID : req.body.userID
            });

            // --- saving to db.
            await newCategory.save();       

             // get all categories.
            const categoryList = await CategoryModel.find({userID : req.body.userID});
                
            // get all categories with subcategories.
            const categoryiesWithSub = categoryList.map( async cat => {
            const Subcats = await SubCategoryModel.find({ catID : cat._id});

            return {
                ...cat,
                sub : Subcats
            }
            })

            const data = await Promise.all(categoryiesWithSub);

            // --- return all relevant categories.
            res.status(200).send(data);
        }        
    },

    // --- add sub category to specific category.
    addSubCategory : async (req, res) => {
        // Check if subcategory with same name exists.
        let found = await SubCategoryModel.findOne({ name : req.body.name })
        if(found) {
            res.status(400).send('Category name already Exist');
        }else {
            let subCategory = await new SubCategoryModel({
                userID : req.body.userID,
                catID : req.body.catID,
                name : req.body.name
            })

            // create new sub category.
            subCategory.save();

            // get all categories.
            const categoryList = await CategoryModel.find({userID : req.body.userID});
            
            // get all categories with subcategories.
            const categoryiesWithSub = categoryList.map( async cat => {
               const Subcats = await SubCategoryModel.find({ catID : cat._id});

               return {
                ...cat,
                sub : Subcats
               }
            })

            const data = await Promise.all(categoryiesWithSub);

            // --- return all relevant categories.
            res.status(200).send(data);
        }
    },

    // --- Get list of categorties related to user by its ID.
    categoryList : async (req, res) => {
        // get all categories.
        const categoryList = await CategoryModel.find({userID : req.body.userID});
            
        // get all categories with subcategories.
        const categoryiesWithSub = categoryList.map( async cat => {
           const Subcats = await SubCategoryModel.find({ catID : cat._id});

           return {
            ...cat,
            sub : Subcats
           }
        })

        const data = await Promise.all(categoryiesWithSub);

        // --- return all relevant categories.
        res.status(200).send(data);
    },

    // --- remove category from list.
    removeCategory : async (req, res) => {
        const { categoryID, subCategoryID, userID } = req.body;
        // --- if sub category is removed
        if (subCategoryID) {
            // -- 1. remove the sub category from the list.
            await SubCategoryModel.find({ _id: subCategoryID }).remove();

            // -- 2. remove all records belong to this subcategroy.
            await recordModel.find({ subCategoryID }).remove();

            // get all categories.
            const categoryList = await CategoryModel.find({userID : req.body.userID});
                
            // get all categories with subcategories.
            const categoryiesWithSub = categoryList.map( async cat => {
            const Subcats = await SubCategoryModel.find({ catID : cat._id});

            return {
                ...cat,
                sub : Subcats
            }
            })

            const data = await Promise.all(categoryiesWithSub);

            // --- return all relevant categories.
            res.status(200).send(data);

        // --- if category is removed.
        } else {
            // -- 1. remove the category from the list.
            await CategoryModel.find({ _id: categoryID }).remove();
    
            // -- 2. remove all sub categories of this category.
            await SubCategoryModel.find({ catID : categoryID }).remove();

            // -- 3. remove all records belong to the category.
            await recordModel.find({ categoryID }).remove();

            // get all categories.
            const categoryList = await CategoryModel.find({userID : req.body.userID});
                
            // get all categories with subcategories.
            const categoryiesWithSub = categoryList.map( async cat => {
            const Subcats = await SubCategoryModel.find({ catID : cat._id});

            return {
                ...cat,
                sub : Subcats
            }
            })

            const data = await Promise.all(categoryiesWithSub);

            // --- return all relevant categories.
            res.status(200).send(data);
        }
    },

    // --- Edit Category --- 
    // --- change the category / sub category name.
    editCategory : async (req, res) => {
        const {  categoryID, subCategoryID, name, userID } = req.body;
        // if subcategory then update it in the subcategory model.
        if (subCategoryID) {
            await SubCategoryModel.findOneAndUpdate({_id : subCategoryID}, { name })
            // get all categories.
            const categoryList = await CategoryModel.find({userID : req.body.userID});
                
            // get all categories with subcategories.
            const categoryiesWithSub = categoryList.map( async cat => {
            const Subcats = await SubCategoryModel.find({ catID : cat._id});

            return {
                ...cat,
                sub : Subcats
            }
            })

            const data = await Promise.all(categoryiesWithSub);

            // --- return all relevant categories.
            res.status(200).send(data);

        // --- other wise update the category name.
        }else {
            await CategoryModel.findOneAndUpdate({_id : categoryID}, { name })
            // --- get all categories.
            const categoryList = await CategoryModel.find({userID : req.body.userID});
                
            // --- get all categories with subcategories.
            const categoryiesWithSub = categoryList.map( async cat => {
            const Subcats = await SubCategoryModel.find({ catID : cat._id});

            return {
                ...cat,
                sub : Subcats
            }
            })

            const data = await Promise.all(categoryiesWithSub);

            // --- return all relevant categories.
            res.status(200).send(data);
        }
    },

    // --- Get records by CatID.
    getRecordsByCategory : async (req, res) => {
        const recordList = await recordModel.find({ categoryID : req.body.catID })
        res.status(200).send(recordList);
    },

    // --- Get records by subCategoryID.
    getRecordsBySubCategory : async (req, res) => {
        const recordList = await recordModel.find({ subCategoryID : req.body.subID })
        res.status(200).send(recordList);
    },

    // --- add record to specific category / sub category.
    addRecord : async (req, res) => {
        // --- Check if category with same name exist.
        let found = await recordModel.findOne({userID: req.body.userID,  ip : req.body.ip })
        if(found) {
            res.status(400).send('Record with same IP already Exist');
        }else {
            // --- creating the new category.
            let newRecord = new recordModel({
                name : req.body.name,
                ip : req.body.ip,
                categoryID : req.body.categoryID,
                subCategoryID : req.body.subCategoryID,
                userID : req.body.userID
            });

            // --- saving to db.
            await newRecord.save();       

             // get all records for sub category.
            if (req.body.subCategoryID){
                let records = await recordModel.find({ subCategoryID : req.body.subCategoryID })
                // --- return all relevant categories.
                res.status(200).send(records);
            // --- if not sub, get all records from category.
            } else {
                let records = await recordModel.find({ categoryID : req.body.categoryID })
                // --- return all relevant categories.
                res.status(200).send(records);
            }
        }        
    },
    // --- remove record by its id.
    removeRecord : async (req, res) => {
        // --- remove record from db.
        await recordModel.find({ _id: req.body.id }).remove();
        // --- return all records for the specific category / subcategory.
         // get all records for sub category.
         if (req.body.subCategoryID){
            let records = await recordModel.find({ subCategoryID : req.body.subCategoryID })
            // --- return all relevant categories.
            res.status(200).send(records);
        // --- if not sub, get all records from category.
        } else {
            let records = await recordModel.find({ categoryID : req.body.categoryID })
            // --- return all relevant categories.
            res.status(200).send(records);
        }
    },

    // edit record by its id.
    editRecord : async (req, res) => {
        let found = await recordModel.findOne({ userID: req.body.userID,  ip : req.body.ip })
        if( found ) {
            res.status(400).send('Record with same IP already Exist');
        }else {
            const { id, name, ip, categoryID, subCategoryID } = req.body;
            await recordModel.findOneAndUpdate({ _id: id}, { name, ip });
    
            // --- return all records for the specific category / subcategory.
             // get all records for sub category.
             if (subCategoryID){
                let records = await recordModel.find({ subCategoryID })
                // --- return all relevant categories.
                res.status(200).send(records);
            // --- if not sub, get all records from category.
            } else {
                let records = await recordModel.find({ categoryID })
                // --- return all relevant categories.
                res.status(200).send(records);
            }
    
        }
        
    },

    // --- recieve list of pings & check their validitiy.
    checkPings : async (req, res) => {
        let updatedList = []
        updatedList = req.body.eqList.map(function (host) {
            return ping.promise.probe(host.ip, { timeout  : 0.1 })
                .then(function (res) {
                    host['status'] = res.alive ? 'תקין' : 'לא תקין'
                    return host;
                });
        });
        
        const data = await Promise.all(updatedList);
        // --- return all relevant categories.
        res.status(200).send(data);
    }
}
