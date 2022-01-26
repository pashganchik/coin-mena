import React from 'react';
import Header from '../../shared/Header/Header';

import './DevsPage.scss';

const DevsPage = (): React.ReactElement => {
    return (
    <div className="devs-page">
        <Header textId='header-text-devs' />
        <div className='devs-page__content'>
            DEVS PAGE CONTENT
        </div>
    </div>);
};

export default DevsPage;
