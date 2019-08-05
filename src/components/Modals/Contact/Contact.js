// React & style
import React from 'react';
import contact from '../../../assets/contact.png';
import './Contact.css';

// Redux & actions
import { connect } from 'react-redux';
import { toggleContactModal } from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';


const Contact = (props) => {
        const { contactModal } = props.modals;
    return (
        <Modal
          className='ContactModal'
          title="יצירת קשר"
          visible={contactModal}
          closable={false}
          onOk={props.ToggleContactModalHandler}
          okText='הבנתי'
          onCancel={props.ToggleContactModalHandler}>
          <img src={contact} alt="Contact"/>
          <p>לרשותכם עמוד "מדריך" אשר נותן מענה לרוב התקלות והבעיות שעלולות לעלות</p>
          <p>אם בכל זאת קיימת בעיה שאין לה מענה אנחנו זמינים בדרכים הבאות : </p>
          <ul>
              <li>מטכלי : 0303 - 6666</li>
              <li> אדום : 613 - 2555</li>
              <li>אימייל : AppTeam + Ctrl + K</li>
          </ul>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modals : state.modals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ToggleContactModalHandler : () => dispatch(toggleContactModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);