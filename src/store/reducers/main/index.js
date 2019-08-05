// ===== Main Reducer ====== // 

// Relevant Constants
import { FILTER_EQUIPMENT, SET_INTERVAL, TOGGLE_DISPLAY_MODE } from '../../actions/main/constants';
import { UPDATE_RECORDS  } from '../../actions/modals/constants';
// Initial State
const initState = {
    // --- List of monitored equipments. { id : 123 , name : 'RTR-1-10R' , ip : '80.80.80.1', status : 'תקין', category : 'נתבים'}
    equipmentList : [],
    // --- input for searching equipment by ip / name
    equipmentSearch : '',
    // --- ping process interval.
    intervalID : null,
    // --- display mode
    //-- true - records
    //-- false - squares
    displayMode: true
}

export default ( state = initState, { type, payload }) => {
    switch(type) {

        // --- Filter equipment by name / ip
        case FILTER_EQUIPMENT:
            return {
                ...state,
                equipmentSearch : payload 
            }
        
        // --- update records list.
        case UPDATE_RECORDS:
            return {
                ...state,
                equipmentList : payload
            }

        // --- toggle display mode.
        case TOGGLE_DISPLAY_MODE:
            return {
                ...state,
                displayMode : !state.displayMode
            }
            
        default:
            return state;
    }
}