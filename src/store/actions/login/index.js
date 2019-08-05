// ====== Login Related Actions ===== // 
// Axios 
import axios from 'axios';
// Prefix for api requiests.
import { PREFIX } from '../general';
// sweetalert
import swal from 'sweetalert';
// Constants relared to login
import { LOGIN_INPUT_CHANGE, USER_AUTHENTICATED } from './constants';
import { UPDATE_CATEGORIES } from '../sidenav/constants';

// Input fields change 
export const loginInputChange = (e) => {
    return { type : LOGIN_INPUT_CHANGE, payload : { field : e.target.name, value : e.target.value }}
}

// --- Authenticate user agains DB.
// -- update isLogged to true
// -- updates the userID for future use.
// -- get all categories available for current user.
export const authenticateUser = (username, password) => {
    return dispatch => {
        axios.post(PREFIX + 'login', { username, password })
            .then((res) => {
                // --- Change User to logged.
                dispatch({ type: USER_AUTHENTICATED, payload : res.data.id });

                // --- recieving user related categories by its ID.
                axios.post(PREFIX + 'system/category_list', { userID : res.data.id})
                    .then((res) => {
                        dispatch({type : UPDATE_CATEGORIES, payload : res.data});
                    })
                    .catch((err) => {
                        console.log('error recieving the categories.');
                    })
            })
            // --- error in authentication
            .catch((err) => {
                swal({
                    title: "שגיאה בהתחברות",
                    text: "שם משתמש או סיסמא שגויים",
                    icon: "error"
                  });
            })
    }
}