// ===== SideNav Reducer ====== // 
// Relevant Constants
import { 
    UPDATE_CATEGORIES,
     CATEGORY_CLICK,
     CATEGORY_WITH_SUBS_CLICK,
     SUB_CATEGORY_CLICK,
     RESET_CATEGORIES_AND_PATH
} from '../../actions/sidenav/constants';

import { UPDATE_RELATIVE_PATH } from '../../actions/modals/constants';

// Initial State
const initState = {
    // --- List of categories & subcategories if exist.
    categories : [
        // { sub: (2) [{…}, {…}], _doc: { _id: "5d4039f8fe1eb819c876e739", name: "נתבים", userID: "5d4039affe1eb819c876e738", __v: 0 } }
    ],
    // --- currently displayed category & sub category.
    currentlyDisplayed : {
        categoryName : '',
        categoryID : null,
        subCategoryName : '',
        subCategoryID : null
    },
    // --- category identifier
    catIdentifier : ''
}
export default ( state = initState, { type, payload }) => {
    switch(type) {

        // --- update categories recieved from DB.
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories : payload
            }

        // --- update relevant stuff when category without subs clicked.
        case CATEGORY_CLICK:
            const { catName, catID } = payload;
            return {
                ...state,
                catIdentifier : catName,
                currentlyDisplayed: Object.assign({}, {
                    categoryName : catName,
                    categoryID : catID,
                    subCategoryName : '',
                    subCategoryID : ''
                })
            }

        // --- update relevant stuff when category with subs clicked
        case CATEGORY_WITH_SUBS_CLICK:
            const { categoryID, categoryName } = payload;
            return {
                ...state,
                catIdentifier : categoryName,
                currentlyDisplayed: Object.assign({}, {
                    categoryName : categoryName,
                    categoryID : categoryID,
                    subCategoryName : '',
                    subCategoryID : ''
                })
            }

        // --- update relevant stuff when sub category clicked
        case SUB_CATEGORY_CLICK:
            const { relatePath, catgID, subID, subName, catgName } = payload;
            return {
                ...state,
                catIdentifier : relatePath,
                currentlyDisplayed: Object.assign({}, {
                    categoryName : catgName,
                    categoryID : catgID,
                    subCategoryName : subName,
                    subCategoryID : subID
                })
            }

        // --- update the relative path.
        case UPDATE_RELATIVE_PATH:
            return {
                ...state,
                catIdentifier : payload
            }

        // --- reset the selected categories & relative path.
        case RESET_CATEGORIES_AND_PATH:
            return {
                ...state,
                // --- reset fields.
                currentlyDisplayed : {
                    categoryName : '',
                    categoryID : null,
                    subCategoryName : '',
                    subCategoryID : null
                },
                // --- category identifier
                catIdentifier : ''
            }
        default:
            return state;
    }
}