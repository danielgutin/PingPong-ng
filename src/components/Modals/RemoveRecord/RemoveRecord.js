// React & style
import React from 'react';
import RemoveRecordIcon from '../../../assets/recycle.png';
import './RemoveRecord.css';

// Redux & actions
import { connect } from 'react-redux';
import { toggleRemoveRecordModal, removeRecordSubmit } from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';

const RemoveRecord = (props) => {
    const { isDisplayed, id } = props.modals.removeRecord;
    const {categoryID, subCategoryID } = props.sidenav.currentlyDisplayed;
  
    return (
        <Modal
          className='RemoveRecord'
          title="מחיקת רכיב"
          visible={isDisplayed}
          closable={false}
          onOk={() => props.RemoveRecordSubmitHandler(id, categoryID, subCategoryID)}
          okText='אישור'
          cancelText='סגור'
          onCancel={() => props.toggleRemoveRecordModalHandler(id)}>
          <div className="RemoveRecord_content">
                <img src={RemoveRecordIcon} alt="RemoveRecord"/>
                <p>למחיקה לחץ אישור </p>    
          </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals,
        sidenav : state.sidenav
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleRemoveRecordModalHandler : (id) => dispatch(toggleRemoveRecordModal(id)),
        RemoveRecordSubmitHandler : (id, categoryID, subCategoryID) => dispatch(removeRecordSubmit(id, categoryID, subCategoryID))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveRecord);