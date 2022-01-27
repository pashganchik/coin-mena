import React, {Dispatch, useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { selectWorkMode, selectCustomFilter } from '../../../redux/selectors';
import { IRootState, WorkModeEnum, ICustomFilter } from '../../../utils/types';
import { setWorkMode, setCustomFilter } from '../../../redux/actions';
import WorkModeSwitcher from './WorkModeSwitcher';
import Filters from './Filters';
import DataRepos from './DataRepos';
import DataDevs from './DataDevs';

import './DataList.scss';

const DataList = (props: IDataListProps): React.ReactElement => {
    const { initialWorkMode, workMode, customFilter, setWorkMode, setCustomFilter } = props;

    useEffect(() => {
        setWorkMode(initialWorkMode);
    }, []);

    return (
        <div className="data-list">
            <div className='data-list__top-pane'>
                <WorkModeSwitcher workMode={workMode} onSetWorkMode={setWorkMode} />
                <Filters workMode={workMode} onSetCustomFilter={setCustomFilter}/>
            </div>

            <div className='data-list__data-pane'>
                { workMode === WorkModeEnum.REPOS 
                    ? <DataRepos filter={customFilter} />
                    : <DataDevs filter={customFilter} />
                }
            </div>
        </div>
    );
};

interface IPropsState {
    workMode: WorkModeEnum;
    customFilter: ICustomFilter;
}
const mapStateToProps = (state: IRootState) => {
    return {
        workMode: selectWorkMode(state),
        customFilter: selectCustomFilter(state),
    };
};

interface IPropsDispatch {
    setWorkMode: (workMode: WorkModeEnum) => void;
    setCustomFilter: (filter: ICustomFilter) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        setWorkMode: (workMode: WorkModeEnum): void => dispatch(setWorkMode(workMode)),
        setCustomFilter: (filter: ICustomFilter): void => dispatch(setCustomFilter(filter)),
    };
};

interface IPropsOwn {
    initialWorkMode: WorkModeEnum;
}

type IDataListProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(DataList);
