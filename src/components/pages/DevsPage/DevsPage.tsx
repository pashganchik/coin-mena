import React from 'react';
import { WorkModeEnum } from '../../../utils/types';
import DataList from '../../shared/DataList/DataList';
import Header from '../../shared/Header/Header';

import './DevsPage.scss';

const DevsPage = (): React.ReactElement => {
    return (
        <div className="devs-page">
            <Header textId="header-text-devs" />
            <div className="devs-page__content">
                <DataList initialWorkMode={WorkModeEnum.DEVS} />
            </div>
        </div>
    );
};

export default DevsPage;
