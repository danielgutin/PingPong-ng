// ===== Modals Reducer ====== // 

// Relevant Constants
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
    TOGGLE_EDIT_CATEGORY_MODAL,
    EDIT_CATEGORY_INPUT_CHANGE,
    TOGGLE_REMOVE_RECORD_MODAL,
    TOGGLE_REMOVE_CATEGORY_MODAL,
    EDIT_RECORD_INPUT_CHANGE,
    TOGGLE_LOADING_MODAL
} from '../../actions/modals/constants';

// Initial State
const initState = {
    
    // --- New Equipment Modal.
    newEquipment : {
        isDisplayed : false
    },

    // --- New category Modal
    newCategory : {
        isDisplayed : false,
        isSubCategory : false,
        name : '',
        selectedCategoryID : null
    },

    // --- Edit Record
    editRecord : {
        isDisplayed : false,
        name : '',
        ip : '',
        ipChange : ''
    },

    // --- Edit Category.
    editCategory : {
        isDisplayed : false,
        name : ''
    },

    // --- remove Record Modal
    removeRecord : {
        isDisplayed : false,
        id : null
    },

    // --- remove category 
    removeCategory : {
        isDisplayed : false
    },
    
    // --- Guide modal, displayed when true.
    infoModal : false,

    // --- contact modal, displayed when true.
    contactModal : false,

    // --- NewRecord Modal.
    newRecord : {
        isDisplayed : false,
        name : '',
        ip : ''
    },
    // --- Loading modal.
    loading : false
}

export default ( state = initState, { type, payload }) => {
    switch(type) {

        // ---  Toggle contact Modal
        case TOGGLE_CONTACT_MODAL:
            return {
                ...state,
                contactModal : !state.contactModal
            }

        // --- Toggle info Modal
        case TOGGLE_INFO_MODAL:
            return {
                ...state,
                infoModal : !state.infoModal
            }

        // --- NewCategory Modal
        case TOGGLE_NEW_CATEGORY_MODAL:
            return {
                ...state,
                newCategory: Object.assign({}, {
                    ...state.newCategory,
                    name : '',
                    selectedCategoryID : null,
                    isSubCategory : false,
                    isDisplayed : !state.newCategory.isDisplayed
                })
            }

        // --- Toggle Sub category Choice.
        case TOGGLE_SUB_CATEGORY: 
            return {
                ...state,
                newCategory: Object.assign({}, {
                    ...state.newCategory,
                    isSubCategory : !state.newCategory.isSubCategory
                })
            }

        // --- new Category input change.
        case CATEGORY_INPUT_CHANGE:
            return {
                ...state,
                newCategory: Object.assign({}, {
                    ...state.newCategory,
                    name : payload
                })
            }

        // --- attach sub category to category by its id.
        case SELECTED_CATEGORY_CHANGE:
            return {
                ...state,
                newCategory: Object.assign({}, {
                    ...state.newCategory,
                    selectedCategoryID : payload
                })
            }

        // --- Toggle NewRecord Modal.
        case TOGGLE_NEW_RECORD_MODAL:
            return {
                ...state,
                newRecord: Object.assign({}, {
                    name : '',
                    ip : '',
                    isDisplayed : !state.newRecord.isDisplayed
                })
            }
        
        // --- new record input name / ip 
        case NEW_RECORD_INPUT_CHANGE:
            return {
                ...state,
                newRecord: Object.assign({}, {
                    ...state.newRecord,
                    [payload.field] : payload.value
                })
            }

        // --- toggle edit record Modal
        case TOGGLE_EDIT_RECORD_MODAL:
            return {
                ...state,
                editRecord: Object.assign({}, {
                    name : payload.name,
                    id : payload.id,
                    ip : payload.ip,
                    ipChange : payload.ip,
                    isDisplayed : !state.editRecord.isDisplayed
                })
            }


        // --- edit record input change 
        case EDIT_RECORD_INPUT_CHANGE:
            return {
                ...state,
                editRecord: Object.assign({}, {
                    ...state.editRecord,
                    [payload.field] : payload.value
                })
            }

        // --- Toggle EditCategory Modal
        case TOGGLE_EDIT_CATEGORY_MODAL:
            return {
                ...state,
                editCategory: Object.assign({}, {
                    name : payload,
                    isDisplayed : !state.editCategory.isDisplayed,
                })
            }

        // --- Edit Category Input Change.
        case EDIT_CATEGORY_INPUT_CHANGE:
            return {
                ...state,
                editCategory: Object.assign({}, {
                    ...state.editCategory,
                    name: payload
                })
            }

            
        // --- Toggle remove record modal.
        case TOGGLE_REMOVE_RECORD_MODAL:
            return {
                ...state,
                removeRecord: Object.assign({}, {
                    isDisplayed : !state.removeRecord.isDisplayed,
                    id : payload
                })
            }

        // --- toggle remove Category Modal.
        case TOGGLE_REMOVE_CATEGORY_MODAL:
            return {
                ...state,
                removeCategory: Object.assign({}, {
                    isDisplayed : !state.removeCategory.isDisplayed
                })
            }

        // --- Toggle loading modal.
        case TOGGLE_LOADING_MODAL:
            return {
                ...state,
                loading : !state.loading
            }
        // --- default state.
        default:
            return state;
    }
}