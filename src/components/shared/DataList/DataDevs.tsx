import React, {Dispatch, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    selectDevelopers,
    selectDevelopersLoading,
} from '../../../redux/selectors';
import { IRootState, ICustomFilter, IDeveloper } from '../../../utils/types';
import { getDevs } from '../../../redux/actions';
import { Const } from '../../../utils/const';

import './DataDevs.scss';

const DataDevs = (props: IDataReposProps): React.ReactElement => {
    const { filter, developers, isLoading, getDevelopers } = props;

    useEffect(() => {
        getDevelopers(filter);
    }, [filter]);

    return (
        <div className="data-devs">
            {isLoading && <span><FormattedMessage id='loading'/></span>}

            {developers && developers.length > 0 && developers.map((dev, i) => {
                return (
                    <div key={i} className='dev-card'>
                        {dev.login}
                    </div>
                )
            })}
        </div>
    );
};

interface IPropsState {
    developers: IDeveloper[];
    isLoading: boolean;
}
const mapStateToProps = (state: IRootState) => {
    return {
        developers: selectDevelopers(state),
        isLoading: selectDevelopersLoading(state),
    };
};

interface IPropsDispatch {
    getDevelopers: (filter: ICustomFilter) => void; 
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getDevelopers: (filter: ICustomFilter): void => dispatch(getDevs(filter)),
    };
};

interface IPropsOwn {
    filter: ICustomFilter;
}

type IDataReposProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(DataDevs);
