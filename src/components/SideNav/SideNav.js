// React & Styling
import React from 'react';
import './SideNav.css';
import logo from '../../assets/logo.png';

// Redux & Actions
import { connect } from 'react-redux';
import { toggleNewCategoryModal, toggleInfoModal, toggleContactModal } from '../../store/actions/modals';
import { logout } from '../../store/actions/main';

// Components
import Menu from './Menu/Menu';

const SideNav = (props) => {
    return (
        <div className='SideNav'>
            <div className='SideNav_logo'>
                <img src={logo} alt="PingPong - NG"/>
            </div>
            <Menu />
            <ul className='SideNav_actions'>
                <li                
                    onClick={() => props.toggleContactModalHandler()}>
                    יצירת קשר
                </li>
                <li
                    onClick={() => props.toggleInfoModalHandler()}>
                    מדריך
                </li>
            </ul>
            <button 
                onClick = {() => props.toggleNewCategoryModalHandler()}
                className="button SideNav_create_category">יצירת קטגוריה</button>
            <button 
                onClick = {() => props.logoutHandler()}
                className="button SideNav_logout">התנתקות</button>
            <div className="SideNav_credit">MADE BY APPTEAM</div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        toggleNewCategoryModalHandler : () => dispatch(toggleNewCategoryModal()),
        logoutHandler : (userID) => dispatch(logout(userID)),
        toggleInfoModalHandler : () => dispatch(toggleInfoModal()),
        toggleContactModalHandler : () => dispatch(toggleContactModal()),
    }
}

export default connect(null, mapDispatchToProps)(SideNav)