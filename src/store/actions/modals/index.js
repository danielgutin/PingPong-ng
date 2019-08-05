// ==== Modals Actions
// sweetalert
import swal from 'sweetalert';
// Axios
import axios from 'axios';

// prefix for server interactions
import { PREFIX, interval } from '../general';

// modals constants
import {
    TOGGLE_CONTACT_MODAL,
    TOGGLE_INFO_MODAL,
    TOGGLE_NEW_CATEGORY_MODAL,
    TOGGLE_SUB_CATEGORY,
    CATEGORY_INPUT_CHANGE,
    SELECTED_CATEGORY_CHANGE,
    TOGGLE_NEW_RECORD_MODAL,
    NEW_RECORD_INPUT_CHANGE,
    TOGGLE_EDIT_RECORD_MODAL,
    EDIT_RECORD_INPUT_CHANGE,
    TOGGLE_EDIT_CATEGORY_MODAL,
    EDIT_CATEGORY_INPUT_CHANGE,
    TOGGLE_REMOVE_RECORD_MODAL,
    TOGGLE_REMOVE_CATEGORY_MODAL,
    UPDATE_RECORDS,
    UPDATE_RELATIVE_PATH,
    TOGGLE_LOADING_MODAL
} from './constants';

// sidenav Constants
import { UPDATE_CATEGORIES, RESET_CATEGORIES_AND_PATH } from '../sidenav/constants';


// --- Toggle contact Modal
export const toggleContactModal = () => {
    return { type : TOGGLE_CONTACT_MODAL }
}

// --- Toggle Info Modal.
export const toggleInfoModal = () => {
    return { type : TOGGLE_INFO_MODAL }
}

// ====== newCategory Modal functionallity ======= // 
// Toggle newCategory Modal.
export const toggleNewCategoryModal = () => {
    return { type : TOGGLE_NEW_CATEGORY_MODAL }
}

// --- Toggle sub Category
export const toggleSubCategory = () => {
    return { type : TOGGLE_SUB_CATEGORY }
}

// --- category input field change
export const categoryInputChange = (e) => {
    return { type : CATEGORY_INPUT_CHANGE , payload : e.target.value }
}


// --- new category submit 
export const newCategorySubmit = (name, userID) => {
    return dispatch => {
        axios.post(PREFIX + 'system/add_category', {
            name,
            userID
        })
        // --- new category created.
        .then((res) => {
            // --- toggle the modal
            dispatch({ type : TOGGLE_NEW_CATEGORY_MODAL })

            // --- msg the user about successfull creation
            swal({
                title: "קטגוריה חדשה נוצרה בהצלחה",
                text: `קטגוריית ${name} נוצרה בהצלחה`,
                icon: "success"
              });

            // --- update the menu with the new category.
            dispatch({type : UPDATE_CATEGORIES, payload : res.data});
        })
        .catch((err) => {
            // --- msg the user about creation failure.
            swal({
                title: "יצירת קטגוריה נכשלה",
                text: `קטגורייה בשם זהה כבר קיימת`,
                icon: "error"
              });
        })
    }
}

// --- attach sub category to category by its ID.
export const selectedCategoryChange = (category) => {
    return { type : SELECTED_CATEGORY_CHANGE, payload : category}
}


// --- submit sub Category creation 
export const newSubCategorySubmit = (name, catID, userID) => {
    return dispatch => {
        // create sub category with name, top categoryID & userID.
        axios.post(PREFIX + 'system/add_sub_category', {
            name,
            userID,
            catID
        })
        // --- new category created.
        .then((res) => {
            // --- toggle the modal
            dispatch({ type : TOGGLE_NEW_CATEGORY_MODAL })

            // --- msg the user about successfull creation
            swal({
                title: "תת קטגוריה נוצרה בהצלחה",
                text: `תת קטגוריה ${name} נוצרה בהצלחה`,
                icon: "success"
              });

            // --- update the menu with the new category.
            dispatch({type : UPDATE_CATEGORIES, payload : res.data});
        })
        .catch((err) => {
            // --- msg the user about creation failure.
            swal({
                title: "יצירת תת קטגוריה נכשלה",
                text: `תת קטגורייה בשם זהה כבר קיימת`,
                icon: "error"
              });
        })
    }
}


// ====== newRecord Modal functionallity ======= // 
// --- toggle new record modal.
export const toggleNewRecordModal = (categoryID, subCategoryID, categories) => {
    return dispatch => {
        // Check if subcategory selected to add record to it.
        if (subCategoryID) {
            dispatch({ type : TOGGLE_NEW_RECORD_MODAL })
            return;
        }
        // check if category has sub categories, if not then its fine to create record to it.
        // otherwise alert the user to enter to sub category.
        if (categoryID) {
            let found = false;
            categories.forEach(category => {
                if (category._doc._id=== categoryID && category.sub.length === 0 ) {
                    dispatch({ type : TOGGLE_NEW_RECORD_MODAL })
                    found = true;
                }
            });
            if(!found) {
                swal({
                    title: "שגיאה בהוספת ציוד לקטגוריה",
                    text: "לקטגוריה הבאה קיימות תתי קטגוריות ולכן ניתן להוסיף אליהן, ולא לקטגוריה עצמה",
                    icon: "error"
                });
                dispatch({type : 'NOTHING'});
            }
        }
        if (!categoryID && !subCategoryID) {
            swal({
                title: "אנא בחר קטגוריה",
                text: "לא ניתן ליצור אלמנט ללא בחירת קטגוריה / תת קטגוריה אליה ישויך האלמנט",
                icon: "error"
            });
            dispatch({ type : 'NOTHING' });
        }
    }   
}

// --- input change to fields.
export const newRecordInputChange = (e) => {
    return { type : NEW_RECORD_INPUT_CHANGE, payload : { field : e.target.name, value : e.target.value }}
}

// --- Submit new Record creation.
export const newRecordSubmit = (categoryID, subCategoryID, name, ip, userID) => {
    if (name.length > 18) {
        swal({
            title: "חריגה מהאורך האפשרי",
            text: "שם הציוד יכול להיות באורך מקסימאלי של 18 תווים",
            icon: "error"
          });
        return { type : 'NOTHING'};
    }
    clearInterval(interval.id);
    return dispatch => {
        // Validate Ip Address.
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
            axios.post(PREFIX + 'system/add_record', {
                categoryID,
                subCategoryID,
                name,
                ip,
                userID
            })
            .then((res) => {
                // update records list for specific category / sub category.
                // dispatch({ type : UPDATE_RECORDS, payload : res.data });
                dispatch({ type : TOGGLE_NEW_RECORD_MODAL });
                dispatch({type: TOGGLE_LOADING_MODAL});
                dispatch({type: UPDATE_RECORDS, payload: res.data });

                axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                .then((res) => {
                    dispatch({type: UPDATE_RECORDS, payload: res.data });
                    dispatch({type: TOGGLE_LOADING_MODAL});
                    interval.id = setInterval(() => {
                        axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                        .then((res) => {
                            dispatch({type: UPDATE_RECORDS, payload: res.data });
                        })
                    }, 5000); 
                });
                // toggle the new item model.
            })
            .catch((err) => {
                swal({
                    title: "כפילות ברשומות",
                    text: "רשומה עם כתובת אייפי זהה כבר קיימת",
                    icon: "error"
                  });
            })
        }else {
            swal({
                title: "שגיאה ביצירת אלמנט חדש",
                text: "כתובת האייפי שהוזנה לא בפורמט הנכון",
                icon: "error"
              });
        }
    }
    
}

// --- edit record Modal Toggle.
export const toggleEditRecordModal = (id, name, ip) => {
    return { type : TOGGLE_EDIT_RECORD_MODAL, payload : { id, name, ip } }
}

// --- editRecord Modal input change.
export const EditRecordInputChange = (e) => {
    return { type : EDIT_RECORD_INPUT_CHANGE, payload : { field : e.target.name, value : e.target.value }}
}

// --- editRecord Submit Modal.
export const EditRecordSubmit = (userID, id, name, ip, categoryID, subCategoryID, ipChange) => {
    return dispatch => {
    // check if ip changed.
        if (ip === ipChange) {
            dispatch({ type : TOGGLE_EDIT_RECORD_MODAL, payload : { id, name, ip }});
        }else {
            if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
                clearInterval(interval.id);
                    // --- chnage the record props by its id & return all relevant records in the category.
                    axios.post(PREFIX + 'system/edit_record', { userID, id, name, ip, categoryID, subCategoryID })
                        .then((res) => {
                            // --- toggle off the edit modal.
                            dispatch({ type : TOGGLE_EDIT_RECORD_MODAL, payload : { id, name, ip }});
                            dispatch({type: TOGGLE_LOADING_MODAL});
                            dispatch({type: UPDATE_RECORDS, payload: res.data });
            
                            axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                            .then((res) => {
                                dispatch({type: UPDATE_RECORDS, payload: res.data });
                                dispatch({type: TOGGLE_LOADING_MODAL});
                                interval.id = setInterval(() => {
                                    axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                                    .then((res) => {
                                        dispatch({type: UPDATE_RECORDS, payload: res.data });
                                    })
                                }, 5000); 
                            });
                        
                        })
                        .catch((err) => {
                            swal({
                                title: "כפילות ברשומות",
                                text: "רשומה עם כתובת אייפי זהה כבר קיימת",
                                icon: "error"
                            });
                        })
                
            } else { 
                swal({
                    title: "שגיאה בעריכת אלמנט ",
                    text: "כתובת האייפי שהוזנה לא בפורמט הנכון",
                    icon: "error"
                });
                return { type : 'NOTHING'};
            }
        }
    }
}

// --- editCategory Modal Toggle
export const toggleEditCategoryModal = (categoryName, categoryID, subCategoryName, subCategoryID) => {
    if (subCategoryID) {
        return { type : TOGGLE_EDIT_CATEGORY_MODAL, payload : subCategoryName }
    }else {
        return { type : TOGGLE_EDIT_CATEGORY_MODAL, payload : categoryName }
    }
}

// --- editCategory Modal input change
export const EditCategoryInputChange = (e) => {
    return { type : EDIT_CATEGORY_INPUT_CHANGE, payload : e.target.value }
}

// --- EditCategory Submit
export const EditCategorySubmit = (categoryName, categoryID, subCategoryName, subCategoryID, name, userID) => {
    return dispatch => {
        axios.post(PREFIX + 'system/edit_category', { categoryID, subCategoryID, name, userID })
            // --- if updated successfully.
            .then((res) => {

                // --- reload list of categories.
                dispatch({type : UPDATE_CATEGORIES, payload : res.data});

                // toggle off the edit modal.
                dispatch({ type : TOGGLE_EDIT_CATEGORY_MODAL })

                // update the relative path 
                let relativePath = '';
                if (subCategoryID) {
                    relativePath = `${categoryName} > ${name}`;
                }else {
                    relativePath = `${name}`;
                }
                dispatch({type : UPDATE_RELATIVE_PATH, payload : relativePath });
            })
            // if update Failed.
            .catch((err) => {
                // notify the user about the failure.
                swal({
                    title: "שגיאה בעריכת קטגוריה",
                    text: "אנא נסה שוב מאוחר יותר",
                    icon: "error"
                  });
                dispatch({type : 'DO_NOTHING'});
            })
    }
}

// --- removeRecord Modal Toggle.
export const toggleRemoveRecordModal = (id) => {
    return { type: TOGGLE_REMOVE_RECORD_MODAL, payload : id };
}


// --- removeRecord Modal Submit
export const removeRecordSubmit = (id, categoryID, subCategoryID) => {
    clearInterval(interval.id);
    return dispatch => {
        axios.post(PREFIX + 'system/remove_record', { id, categoryID, subCategoryID })
            .then((res) => {
                // update records list for specific category / sub category.
                // dispatch({ type : UPDATE_RECORDS, payload : res.data });
                dispatch({ type: TOGGLE_REMOVE_RECORD_MODAL, payload : id });
                dispatch({type: TOGGLE_LOADING_MODAL});
                dispatch({type: UPDATE_RECORDS, payload: res.data });

                axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                .then((res) => {
                    dispatch({type: UPDATE_RECORDS, payload: res.data });
                    dispatch({type: TOGGLE_LOADING_MODAL});
                    interval.id = setInterval(() => {
                        axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                        .then((res) => {
                            dispatch({type: UPDATE_RECORDS, payload: res.data });
                        })
                    }, 5000); 
                });
            })
            .catch((err) => {
                dispatch({type : 'NOTHING'});
            })
    }
}


// --- remove Category / sub Category Modal
export const toggleRemoveCategoryModal =  () => {
    return { type : TOGGLE_REMOVE_CATEGORY_MODAL }
}

// --- submit Remove Category Modal.
export const RemoveCategorySubmit = (categoryID, subCategoryID, userID) => {
    return dispatch => {
        axios.post(PREFIX  + 'system/remove_category', { categoryID, subCategoryID, userID })
            .then((res) => {

                // --- update the categories.
                dispatch({type : UPDATE_CATEGORIES, payload : res.data});

                // --- reset the selected category, SubCategory & path.
                dispatch({type : RESET_CATEGORIES_AND_PATH });

                // --- reset equipment
                dispatch({type : UPDATE_RECORDS, payload : []});

                // --- toggle the remove modal.
                dispatch({ type : TOGGLE_REMOVE_CATEGORY_MODAL });

            })
            .catch((err) => {
                console.log(err);
                dispatch({type : 'NOTHING'});
            })
    }
}