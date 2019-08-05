// ===== SideNav Related Actions ==== // 
import { 
    CATEGORY_CLICK,
    CATEGORY_WITH_SUBS_CLICK,
    SUB_CATEGORY_CLICK
} from './constants';

import { UPDATE_RECORDS,  TOGGLE_LOADING_MODAL } from "../modals/constants";


// --- Axios
import axios from 'axios';
// --- PREFIX for api calls.
import { PREFIX, interval, catSwitch } from '../general';


let catid =  null;

// --- clicking on nav item without sub categories.
export const categoryClick = (catID, catName) => {
    return dispatch => {
        if ( catid !== catID ) { 
            catSwitch.state = true;
            catid = catID;
            clearInterval(interval.id);

            // Load Relevant Records.
            axios.post(PREFIX + 'system/get_records_by_category', { catID })
                .then((res) => {
                    // start loading modal.
                    dispatch({type: TOGGLE_LOADING_MODAL});
                    axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                    .then((res) => {
                        dispatch({type: TOGGLE_LOADING_MODAL});
                        dispatch({type: UPDATE_RECORDS, payload: res.data });
    
                        interval.id = setInterval(() => {
                            axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                            .then((res) => {
                                if (catSwitch.state) {
                                    dispatch({type: UPDATE_RECORDS, payload: res.data });
                                }else {
                                    catSwitch.state = false;
                                    clearInterval(interval.id);
                                }
                            })
                        }, 5000); 
                    });
                })
            // change the category path displayed in main window & update the current selected category details.
            dispatch({ type : CATEGORY_CLICK, payload: { catID, catName }})
        }else {
            dispatch({ type : 'NOTHING' });
        }
    }
}

// --- category item with subs click.
export const categoryWithSubsClick= (categoryID, categoryName) => {
    return dispatch => {
        // update the current selected category details & change the category path displayed in main window.
        dispatch({ type : CATEGORY_WITH_SUBS_CLICK, payload: { categoryID, categoryName }})
    }
}

// --- subcategory item click Functionallity
export const subCategoryClick = (catgID, catgName, subID, subName) => {
    return dispatch => {
        if (catid !== subID) {
            catSwitch.state = true;
            catid = subID;
            clearInterval(interval.id);
    
            // start loading modal.
            dispatch({type: TOGGLE_LOADING_MODAL});
            // load relevant sub category record.
            axios.post(PREFIX + 'system/get_records_by_sub_category', { subID })
            .then((res) => {
                axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                .then((res) => {
                    dispatch({type: TOGGLE_LOADING_MODAL});
                    dispatch({type: UPDATE_RECORDS, payload: res.data });
                    interval.id = setInterval(() => {
                        axios.post(PREFIX + 'system/get_pings', { eqList : res.data })
                        .then((res) => {
                            if(catSwitch.state) {
                                dispatch({type: UPDATE_RECORDS, payload: res.data });
                            }else {
                                catSwitch.state = false;
                                clearInterval(interval.id);
                            }
                        })
                    }, 5000); 
                });
            })        
    
            // update the current selected subcategory details & update path displayed in main window.
            dispatch({ type : SUB_CATEGORY_CLICK, payload: { 
                relatePath : `${catgName} > ${subName}`,
                catgID,
                subID,
                subName,
                catgName
             }})
        }else {
            dispatch({ type : 'NOTHING' });
        }
    }
}


// --- check pings to list of equipment displayed.
export const pingCheck = (eqList ) => {
    return dispatch => {
        axios.post(PREFIX + 'system/get_pings', { eqList : eqList })
            .then((res) => {
                dispatch({type: UPDATE_RECORDS, payload: res.data });
            })
    }
}


