// React & Styling
import React from 'react';
import './System.css';


// Components
import SideNav from '../SideNav/SideNav';
import Main from './Main/Main';

// Modals
import ConactModal from '../Modals/Contact/Contact';
import InfoModal from '../Modals/Info/Info';
import NewCategory from '../Modals/NewCategory/NewCategory';
import NewRecord from '../Modals/NewRecord/NewRecord';
import EditRecord from '../Modals/EditRecord/EditRecord';
import EditCategory from '../Modals/EditCategory/EditCategory';
import RemoveRecord from '../Modals/RemoveRecord/RemoveRecord';
import RemoveCategory from '../Modals/RemoveCategory/RemoveCategory';
import LoadingModal from '../Modals/LoadingModal/LoadingModal';

export default function System() {
    return (
        <div className='System'>
            <Main />
            <SideNav />

            <ConactModal />
            <InfoModal />
            <NewCategory />
            <NewRecord />
            <EditRecord/>
            <EditCategory />
            <RemoveRecord />
            <RemoveCategory />
            <LoadingModal />
        </div>
    )
}
