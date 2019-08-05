// ===== Login Reducer ====== // 
// Relevant Constants
import { LOGIN_INPUT_CHANGE, USER_AUTHENTICATED } from '../../actions/login/constants';
// Initial State
const initState = {
    // user form input fields.
    loginForm : {
        username : '',
        password : ''
    },
    // is the user currently logged.
    isLogged : false,
    // after user logged in, use its id to perform actions.
    userID: null
}

export default ( state = initState, { type, payload }) => {
    switch(type){

        // ---  Login input value change
        case LOGIN_INPUT_CHANGE:
            return {
                ...state,
                loginForm: Object.assign({}, {
                    ...state.loginForm,
                    [payload.field] : payload.value
                })
            }
            
        // --- User successfully Authenticated.
        case USER_AUTHENTICATED:
            return {
                ...state,
                isLogged : true,
                userID : payload,
                loginForm: Object.assign({}, {
                    username : '',
                    password : ''
                })
            }
        default:
            return state;
    }
}