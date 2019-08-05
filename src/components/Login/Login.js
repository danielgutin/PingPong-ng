// React & Styling
import React from 'react';
import './Login.css';
import logo from '../../assets/logo_trans.png';

// Redux & Actions
import { connect } from 'react-redux';
import { authenticateUser, loginInputChange } from '../../store/actions/login';

// Components
import { Input, Icon } from 'antd';


const Login = (props) => {
    const { username, password } = props.login.loginForm;
    return (
        <div className='Login'>
            <div className="Login_content">
                <img src={logo} alt="PingPong"/>
                <Input
                    value={username}
                    onChange={(e) => props.loginInputChangeHandler(e)}
                    name='username'
                    placeholder="הכנס שם משתמש"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                <Input
                    value={password}
                    onChange={(e) => props.loginInputChangeHandler(e)}
                    type='password'
                    name='password'
                    placeholder="הכנס סיסמא"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                <button 
                    onClick = {() => props.authenticateUserHandler(username, password)}
                    className='button Login_content-btn'>התחבר</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        login : state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateUserHandler : (username, password) => dispatch(authenticateUser(username, password)),
        loginInputChangeHandler : (e) => dispatch(loginInputChange(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);