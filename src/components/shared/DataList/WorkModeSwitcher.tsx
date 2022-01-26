import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { WorkModeEnum } from '../../../utils/types';

import './WorkModeSwitcher.scss';

const WorkModeSwitcher = (props: IWorkModeSwitcher): React.ReactElement => {
    const { workMode, onSetWorkMode } = props;

    const handleSetMode = (newMode: WorkModeEnum) => {
        onSetWorkMode(newMode);
    }

    return (
        <div className="work-mode-switcher">
            <Button onClick={() => handleSetMode(WorkModeEnum.REPOS)} variant={workMode === WorkModeEnum.REPOS ? 'primary' : 'secondary'}>
                <FormattedMessage id='repositories'/>
            </Button>
            <Button onClick={() => handleSetMode(WorkModeEnum.DEVS)} variant={workMode === WorkModeEnum.DEVS ? 'primary' : 'secondary'}>
                <FormattedMessage id='developers'/>
            </Button>
        </div>
    );
};

interface IWorkModeSwitcher {
    workMode: WorkModeEnum;
    onSetWorkMode: (workMode: WorkModeEnum) => void;
}

export default WorkModeSwitcher;
