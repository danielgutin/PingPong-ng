// React & style
import React from 'react';
import EditCategoryIcon from '../../../assets/edit.png';
import './EditCategory.css';

// Redux & actions
import { connect } from 'react-redux';
import { 
    EditCategoryInputChange,
    toggleEditCategoryModal,
    EditCategorySubmit 
} from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';

const EditCategory = (props) => {
    let { isDisplayed, name } = props.modals.editCategory;
    const { categoryName, categoryID, subCategoryName, subCategoryID } = props.sidenav.currentlyDisplayed; 
    const { userID } = props.login;
    return (
        <Modal
          className='EditCategory'
          title="עריכת קטגוריה"
          visible={isDisplayed}
          closable={false}
          onOk={() => props.EditCategorySubmitHandler(categoryName, categoryID, subCategoryName, subCategoryID, name, userID)}
          okText='אישור'
          cancelText='סגור'
          onCancel={props.toggleEditCategoryModalHandler}>
          <div className="EditCategory_content">
                <img src={EditCategoryIcon} alt="EditCategory"/>
                <input
                    value={name}
                    onChange={(e) => props.EditCategoryInputChangeHandler(e)}
                    placeholder='שם קטגוריה' 
                    type="text"
                    name='name'/>
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
        toggleEditCategoryModalHandler : () => dispatch(toggleEditCategoryModal()),
        EditCategoryInputChangeHandler : (e) => dispatch(EditCategoryInputChange(e)),
        EditCategorySubmitHandler : (categoryName, categoryID, subCategoryName, subCategoryID, name, userID) => dispatch(EditCategorySubmit(categoryName, categoryID, subCategoryName, subCategoryID, name, userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);