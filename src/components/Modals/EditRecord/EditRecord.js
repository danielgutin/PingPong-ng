// React & style
import React from 'react';
import EditRecordIcon from '../../../assets/edit.png';
import './EditRecord.css';

// Redux & actions
import { connect } from 'react-redux';
import { EditRecordInputChange, toggleEditRecordModal, EditRecordSubmit } from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';

const EditRecord = (props) => {
    const { isDisplayed, name, ip, id, ipChange } = props.modals.editRecord;
    const { categoryID, subCategoryID } = props.sidenav.currentlyDisplayed;
    const { userID } = props.login;
    return (
        <Modal
          className='EditRecord'
          title="עריכת רשומה"
          visible={isDisplayed}
          closable={false}
          onOk={() => props.EditRecordSubmitHandler(userID, id, name, ip, categoryID, subCategoryID, ipChange)}
          okText='אישור'
          cancelText='סגור'
          onCancel={() => props.toggleEditRecordModalHandler(id, ip, name)}>
          <div className="EditRecord_content">
                <img src={EditRecordIcon} alt="EditRecord"/>
                <input
                    value={name}
                    onChange={(e) => props.EditRecordInputChangeHandler(e)}
                    placeholder='הכנס שם ציוד' 
                    type="text"
                    name='name'/>
                <input
                    value={ip}
                    onChange={(e) => props.EditRecordInputChangeHandler(e)}
                    placeholder='הכנס כתובת אייפי' 
                    type="text"
                    name='ip'/>
          </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals,
        sidenav : state.sidenav,
        login : state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleEditRecordModalHandler : (id, ip, name ) => dispatch(toggleEditRecordModal()),
        EditRecordInputChangeHandler : (e) => dispatch(EditRecordInputChange(e)),
        EditRecordSubmitHandler : (userID, id, name, ip, categoryID, subCategoryID, ipChange) => dispatch(EditRecordSubmit(userID, id, name, ip, categoryID, subCategoryID, ipChange))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecord);