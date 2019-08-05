// React & Styling.
import React from 'react';
import './RecordItem.css';

// redux & Actions
import { connect } from 'react-redux';
import { toggleRemoveRecordModal, toggleEditRecordModal } from '../../../../../store/actions/modals';

const RecordItem = (props) => {
    const { _id, ip, name, status }  = props.record;
    let eqStatus = '';
    if (status === 'תקין') {
        eqStatus = 'online';
    }
    if (status === 'לא תקין') {
        eqStatus = 'offline';
    }
    if (status === 'מאתחל') {
        eqStatus = 'intialize';
    }

    return (
        <div className='RecordItem'>
           <span>{props.record.name}</span> 
           <span>{props.record.ip}</span> 
           <span className={eqStatus}>{props.main.displayMode ? status : null }</span>
           <div className="RecordItem_actions">
            <button 
                onClick = {() => props.toggleEditRecordModalHandler(_id, name, ip)}
                className='button'>ערוך</button>
            <button 
                onClick = {() => props.toggleRemoveRecordModalHandler(_id)}
                className='button'>מחק</button>
           </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals,
        main : state.main
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleRemoveRecordModalHandler : (id) => dispatch(toggleRemoveRecordModal(id)),
        toggleEditRecordModalHandler : (id, name, ip) => dispatch(toggleEditRecordModal(id, name, ip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordItem);