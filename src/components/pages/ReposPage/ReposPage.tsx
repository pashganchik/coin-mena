import React from 'react';
import DataList from '../../shared/DataList/DataList';
import Header from '../../shared/Header/Header';
import { WorkModeEnum } from '../../../utils/types';

import './ReposPage.scss';

const ReposPage = (): React.ReactElement => {
    return (
        <div className="repos-page">
            <Header textId="header-text-repos" />

            <div className="repos-page__content">
                <DataList initialWorkMode={WorkModeEnum.REPOS} />
            </div>
        </div>
    );
};

export default ReposPage;
