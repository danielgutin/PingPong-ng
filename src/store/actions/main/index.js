// ========== Main Actions ================= //
// --- Constants related to Main.
import { FILTER_EQUIPMENT, SYSTEM_LOGOUT, SET_INTERVAL, TOGGLE_DISPLAY_MODE } from './constants';

// --- filter equipment input.
export const filterEquipment = (e) => {
    return { type : FILTER_EQUIPMENT, payload : e.target.value }
}

// --- logout by userID.
export const logout = (userID) => {
    return { type : SYSTEM_LOGOUT }
}

// set current interval.
export const setIntervalFunc = (interval) => {
    return { type : SET_INTERVAL, payload : interval};
}
// --- toggle display mode.
export const toggleDisplayMode = () => {
    return { type : TOGGLE_DISPLAY_MODE }
}