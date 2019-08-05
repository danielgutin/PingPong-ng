// React & style
import React from 'react';
import LoadingIcon from '../../../assets/pingpong-load.gif';
import './LoadingModal.css';

// Redux & actions
import { connect } from 'react-redux';

// Components
import { Modal } from 'antd';

const LoadingModal = (props) => {
    const { loading } = props.modals;
    return (
        <Modal
          className='Loading'
          visible={loading}
          closable={false}>
          <div className="Loading_content">
               <h3>טוען את הרשומות הרלוונטיות</h3>
               <img src={LoadingIcon} alt="Loading"/>
          </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals
    }
}

export default connect(mapStateToProps)(LoadingModal);