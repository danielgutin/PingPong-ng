// --- React & Styling.
import React, { Component } from 'react';
// AntD styles.
import 'antd/dist/antd.css'; 
// App Styling.
import './App.css';

// Redux & Actions
import { connect } from 'react-redux';

// Components
import Login from './components/Login/Login';
import System from './components/System/System';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.login.isLogged 
            ? <System />
            : <Login />
        } 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login : state.login
  }
}

export default connect(mapStateToProps)(App);
