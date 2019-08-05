// redux Stuff.
import { combineReducers } from 'redux';

// Different App Reducers.
import login from './login';
import modals from './modals';
import sidenav from './sidenav';
import main from './main';

export default combineReducers({
    login,
    modals,
    sidenav,
    main
})