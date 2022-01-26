import React from 'react';
import Header from '../../shared/Header/Header';

import './ReposPage.scss';

const ReposPage = (): React.ReactElement => {
    return (
    <div className="repos-page">
        <Header textId='header-text-repos' />

        <div className='repos-page__content'>
            REPOS PAGE CONTENT
        </div>
    </div>);
};

export default ReposPage;
