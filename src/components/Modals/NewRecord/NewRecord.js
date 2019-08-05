// React & style
import React from 'react';
import NewRecordIcon from '../../../assets/record.png';
import './NewRecord.css';

// Redux & actions
import { connect } from 'react-redux';
import { newRecordInputChange, toggleNewRecordModal, newRecordSubmit } from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';

const NewRecord = (props) => {
    const { isDisplayed, name, ip } = props.modals.newRecord;
    const { categoryName, categoryID, subCategoryName ,subCategoryID } = props.sidenav.currentlyDisplayed;
    const { categories } = props.sidenav;
    const { userID } = props.login;
    return (
        <Modal
          className='NewRecord'
          title="יצירת רשומה חדשה"
          visible={isDisplayed}
          closable={false}
          onOk={() => props.newRecordSubmitHandler( categoryID, subCategoryID, name, ip, userID)}
          okText='אישור'
          cancelText='סגור'
          onCancel={() => props.toggleNewRecordModalHandler(categoryID, subCategoryID, categories)}>
          <div className="NewRecord_content">
                <img src={NewRecordIcon} alt="NewRecord"/>
                <input
                    value={name}
                    onChange={(e) => props.newRecordInputChangeHandler(e)}
                    placeholder='הכנס שם ציוד' 
                    type="text"
                    name='name'/>
                <input
                    value={ip}
                    onChange={(e) => props.newRecordInputChangeHandler(e)}
                    placeholder='הכנס כתובת אייפי' 
                    type="text"
                    name='ip'/>
                <p>כתובת אייפי בפורמט : xxx.xxx.xxx.xxx</p>    
          </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals,
        sidenav: state.sidenav,
        login : state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewRecordModalHandler : (categoryID, subCategoryID, categories) => dispatch(toggleNewRecordModal(categoryID, subCategoryID, categories)),
        newRecordInputChangeHandler : (e) => dispatch(newRecordInputChange(e)),
        newRecordSubmitHandler : (categoryID, subCategoryID, name, ip, userID) => dispatch(newRecordSubmit(categoryID, subCategoryID, name, ip, userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);