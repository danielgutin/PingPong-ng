// React & Styling.
import React, { Component } from 'react';
import './RecordList.css';
import empty from '../../../../assets/empty.png';
// Redux & Actions
import { connect } from 'react-redux';

// Components
import RecordItem from './RecordItem/RecordItem';

class RecordList extends Component {
    render() {
        const { equipmentList, equipmentSearch }  = this.props.main;
        return (
            <div className={ this.props.main.displayMode ? 'RecordList' : 'RecordList-square'}>
                {
                    equipmentList.length > 0 
                    ? equipmentList.map((record, index) => {
                        if ( record.name.includes(equipmentSearch) || record.ip.includes(equipmentSearch) ) {
                            return <RecordItem key={index} record={record} />
                        } else {
                            return null
                        }
                    })   
                    : <div className='RecordList_norecords'>
                        <img src={empty} alt="No Records"/>
                        <h3>לא קיימות רשומות לקטגוריה זו</h3>
                      </div>
                }    
            </div>
        )
    }

}



const mapStateToProps = state => {
    return {
        main : state.main,
        sidenav : state.sidenav
    }
}

export default connect(mapStateToProps)(RecordList);