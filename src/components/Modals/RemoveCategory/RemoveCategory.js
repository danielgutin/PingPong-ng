// React & style
import React from 'react';
import RemoveCategoryIcon from '../../../assets/recycle.png';
import './RemoveCategory.css';

// Redux & actions
import { connect } from 'react-redux';
import { toggleRemoveCategoryModal, RemoveCategorySubmit } from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';

const RemoveCategory = (props) => {
    const { isDisplayed } = props.modals.removeCategory;
    const { categoryName, categoryID, subCategoryName, subCategoryID } = props.sidenav.currentlyDisplayed;
    const { userID } = props.login;
    return (
        <Modal
          className='RemoveCategory'
          title="מחיקת קטגוריה"
          visible={isDisplayed}
          closable={false}
          onOk={() => props.RemoveCategorySubmitHandler(categoryID, subCategoryID, userID)}
          okText='אישור'
          cancelText='סגור'
          onCancel={props.toggleRemoveCategoryModalHandler}>
          <div className="RemoveCategory_content">
                <img src={RemoveCategoryIcon} alt="RemoveCategory"/>
                {
                    subCategoryID 
                        ?  (
                            <p>מחיקת תת קטגוריה {subCategoryName}</p>
                        )
                        : (
                            <p>מחיקת קטגוריה {categoryName}</p>
                        )
                }
                <p>למחיקה לחץ אישור </p>    
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
        toggleRemoveCategoryModalHandler : () => dispatch(toggleRemoveCategoryModal()),
        RemoveCategorySubmitHandler : (categoryID, subCategoryID, userID) => dispatch(RemoveCategorySubmit(categoryID, subCategoryID, userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveCategory);