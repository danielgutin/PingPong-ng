// React & style
import React from 'react';
import NewCategoryIcon from '../../../assets/folder.png';
import './NewCategory.css';

// Redux & actions
import { connect } from 'react-redux';
import { 
    toggleNewCategoryModal,
    toggleSubCategory,
    categoryInputChange,
    newCategorySubmit,
    selectedCategoryChange,
    newSubCategorySubmit
} from '../../../store/actions/modals';

// Components
import { Modal, Switch, Select } from 'antd';

const NewCategory = (props) => {
    const { isDisplayed, isSubCategory, name, selectedCategoryID } = props.modals.newCategory;
    const { userID } = props.login;
    const { categories } = props.sidenav;

    return (
        <Modal
          className='NewCategory'
          title="יצירת קטגוריה חדשה"
          visible={isDisplayed}
          closable={false}
          onOk={
              isSubCategory 
                ? () => props.newSubCategorySubmitHandler(name, selectedCategoryID, userID)
                : () => props.newCategorySubmitHandler(name, userID)
          }
          okText='אישור'
          cancelText='סגור'
          onCancel={props.toggleNewCategoryModalHandler}>
          <img src={NewCategoryIcon} alt="NewCategory"/>
          <div className="NewCategory_content">
                <div className='NewCategory_content-item'>
                    <label> קטגוריה</label>
                    <input 
                        type="text"
                        onChange={(e) => props.categoryInputChangeHandler(e)}
                        placeholder='שם קטגוריה'
                        value={name}/>
                </div>
                <div className='NewCategory_content-item'>
                    <label>תת קטגוריה</label>
                    <Switch checked={isSubCategory} onChange={() => props.toggleSubCategoryHandler()} />            
                </div>
                {
                    isSubCategory 
                    ? (
                        <div className='NewCategory_content-item'>
                            <label>שייך לקטגוריה</label>
                            <Select 
                                placeholder= 'בחר קטגוריה'
                                style={{ width: 250 }}
                                onChange={(e) => props.selectedCategoryChangeHandler(e)}>
                                {
                                    categories.length > 0 
                                        ? categories.map((cat) => (
                                            <Select.Option value={cat._doc._id}>{cat._doc.name}</Select.Option>
                                        ))
                                        : null 
                                }
                            </Select>
                        </div>
                    )
                    : null
                }
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals,
        login : state.login,
        sidenav : state.sidenav
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewCategoryModalHandler : () => dispatch(toggleNewCategoryModal()),
        toggleSubCategoryHandler : () => dispatch(toggleSubCategory()),
        categoryInputChangeHandler : (e) => dispatch(categoryInputChange(e)),
        newCategorySubmitHandler : (name, userID) => dispatch(newCategorySubmit(name, userID)),
        selectedCategoryChangeHandler : (id) => dispatch(selectedCategoryChange(id)),
        newSubCategorySubmitHandler : (name, selectedCategoryID, userID) => dispatch(newSubCategorySubmit(name, selectedCategoryID, userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);