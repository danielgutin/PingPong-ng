// React & style
import React from 'react';
import instructor from '../../../assets/instructor.png';
import './Info.css';

// Redux & actions
import { connect } from 'react-redux';
import { toggleInfoModal } from '../../../store/actions/modals';

// Components
import { Modal } from 'antd';


const Contact = (props) => {
        const { infoModal } = props.modals;
    return (
        <Modal
          className='InfoModal'
          title="מדריך שימוש"
          visible={infoModal}
          closable={false}
          onOk={props.toggleInfoModalHandler}
          okText='תודה'
          onCancel={props.toggleInfoModalHandler}>
          <img src={instructor} alt="Contact"/>
          <div className="InfoModal_content">
            <div className="InfoModal_section">
                <h3>הסבר כללי על הפיצ'רים השונים</h3>
                <p>בחלק זה נעסוק בפיצ'רים השונים שיש לנו במערכת</p>
            </div>
            <div className="InfoModal_section">
                <h3>תפריט הצד</h3>
                <p>בחלק זה נסביר כיצד להשתמש בתפריט הניווט ומה הוא מציג</p>
                <p>בתפריט המופיע מימין נוכל לראות את כל הקטגוריות שנוצרו, לחיצה על קטגוריה מסויימת תפתח תתי קטגוריות לאותה קטגוריה במידה ונוצרו, במידה ולא פשוט נועבר לציוד הרלוונטי לאותה קטגוריה</p>
                <p>בנוסף לקטגוריות נוכל לראות שני קישורים קבועים</p>
                <ul>
                    <li>מדריך - זהו המדריך אותו אתם קוראים עכשיו</li>
                    <li>יצירת קשר - במידה והמדריך לא נתן מענה לבעיה שעלתה, או שיש לכם הצעות לשיפור המערכת נשמח לשמוע מכם </li>
                </ul>
                <p>בתחתית התפריט קיים כפתור "יצירת קטגוריה", לחיצה על כפתור זה תפתח חלון שישמש אתכם ליצירה של קטגוריה חדשה</p>
            </div>
            <div className="InfoModal_section">
                <h3>ניטור הרכיבים</h3>
                <p>בחלק זה נעסוק בתצוגה המרכזית של המערכת וניטור הציוד</p>
                <p>חלון הניטור מחולק לשני חלקים</p>
                <ul>
                    <li>תפריט עליון לביצוע פעולות</li>
                    <li>התצוגה של הרכיבים</li>
                </ul>
                <p>בתפריט העליון נוכל לבצע שני דברים</p>
                <ul>
                    <li>הוספת רכיב חדש לאותה קטגוריה</li>
                    <li>חיפוש של רכיב לפי כתובת אייפי או שם הרכיב</li>
                </ul>
                <p>בתצוגת הרכיבים נוכל לראות את כל הציוד המנוטר באותה קטגוריה, כל רכיב יכיל את הפרטים הבאים</p>
                <ul>
                    <li>שם רכיב</li>
                    <li>כתובת אייפי</li>
                    <li>סטטוס תקינות</li>
                    <li>פעולת השהייה / הסרת הציוד מרשימת המנוטרים</li>
                </ul>
            </div>
          </div>
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
        toggleInfoModalHandler : () => dispatch(toggleInfoModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);