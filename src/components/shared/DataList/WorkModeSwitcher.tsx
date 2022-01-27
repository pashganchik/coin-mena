import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { WorkModeEnum } from '../../../utils/types';

import './WorkModeSwitcher.scss';

const WorkModeSwitcher = (props: IWorkModeSwitcher): React.ReactElement => {
    const { workMode, onSetWorkMode } = props;
    const history = useHistory();

    // switch in the state, without routing
    const handleSetMode = (newMode: WorkModeEnum) => {
        onSetWorkMode(newMode);
    };

    // switch via router
    const handleSetModeRoute = (newMode: WorkModeEnum) => {
        history.push(newMode === WorkModeEnum.REPOS ? '/repos' : '/devs');
    };

    return (
        <div className="work-mode-switcher">
            <Button
                onClick={() => handleSetModeRoute(WorkModeEnum.REPOS)}
                variant={workMode === WorkModeEnum.REPOS ? 'primary' : 'secondary'}
            >
                <FormattedMessage id="repositories" />
            </Button>
            <Button
                onClick={() => handleSetModeRoute(WorkModeEnum.DEVS)}
                variant={workMode === WorkModeEnum.DEVS ? 'primary' : 'secondary'}
            >
                <FormattedMessage id="developers" />
            </Button>
        </div>
    );
};

interface IWorkModeSwitcher {
    workMode: WorkModeEnum;
    onSetWorkMode: (workMode: WorkModeEnum) => void;
}

export default WorkModeSwitcher;
