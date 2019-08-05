// React & Styling.
import React from 'react';
import './Main.css';

// Redux & Actions
import { connect } from 'react-redux';
import { toggleNewRecordModal, toggleEditCategoryModal, toggleRemoveCategoryModal } from '../../../store/actions/modals';
import { filterEquipment, toggleDisplayMode } from '../../../store/actions/main';

// Components
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit, faObjectGroup } from '@fortawesome/fontawesome-free-solid'
import RecordList from './RecordList/RecordList';

const { Search } = Input;

const Main = (props) => {
    const { catIdentifier, currentlyDisplayed, categories } = props.sidenav;
    const { categoryName, categoryID, subCategoryName, subCategoryID } = currentlyDisplayed;
    return (
        <div className='Main'>
            <div className="Main_controller">
            <div 
                className="button Main_controller-new"
                onClick={() => props.toggleNewRecordModalHandler(categoryID, subCategoryID, categories)}>
                <span>הוספת רכיב</span>
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <div 
              onClick = {() => props.toggleEditCategoryModalHandler(categoryName, categoryID, subCategoryName, subCategoryID)}
              className="button Main_controller-edit">
                <span>עריכת קטגורייה</span>
                <FontAwesomeIcon icon={faEdit} />
            </div>
            <div
              onClick = {() => props.toggleRemoveCategoryModalHandler()}  
              className="button Main_controller-remove">
                <span>מחיקת קטגורייה</span>
                <FontAwesomeIcon icon={faTrash} />
            </div>
            <Search
                placeholder="חפש לפי כתובת או שם רכיב"
                onChange = {value => props.filterEquipmentHandler(value)}
                style={{ width: 200 }}  />
            </div>
            <div className="Main_content">
                <h2 className='Main_content_cat'>{catIdentifier}</h2>
     
                <div className="Main_content-header">
                    <span>שם רכיב</span>
                    <span>כתובת אייפי</span>
                    <span>סטטוס</span>
                    <span>פעולות</span>
                    <button
                    onClick={() => props.toggleDisplayModeHandler()} 
                    className='Main_content-square'>                
                        <FontAwesomeIcon icon={faObjectGroup} />
                    </button>
                </div>
                <RecordList />
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        sidenav : state.sidenav
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewRecordModalHandler : (categoryID, subCategoryID, categories) => dispatch(toggleNewRecordModal(categoryID, subCategoryID, categories)),
        toggleEditCategoryModalHandler : (categoryName, categoryID, subCategoryName, subCategoryID) => dispatch(toggleEditCategoryModal(categoryName, categoryID, subCategoryName, subCategoryID)),
        toggleRemoveCategoryModalHandler : () => dispatch(toggleRemoveCategoryModal()),
        filterEquipmentHandler : (value) => dispatch(filterEquipment(value)),
        toggleDisplayModeHandler : () => dispatch(toggleDisplayMode())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);