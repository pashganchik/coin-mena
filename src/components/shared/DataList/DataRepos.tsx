import React, {Dispatch, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    selectRepositories,
    selectRepositoriesLoading
} from '../../../redux/selectors';
import { IRootState, ICustomFilter, IRepository } from '../../../utils/types';
import { getRepos } from '../../../redux/actions';
import { Const } from '../../../utils/const';

import './DataRepos.scss';

const DataRepos = (props: IDataReposProps): React.ReactElement => {
    const { filter, repositories, isLoading, getRepositories } = props;

    useEffect(() => {
        getRepositories(filter);
    }, [filter]);

    return (
        <div className="data-repos">
            {isLoading && <span><FormattedMessage id='loading'/></span>}

            {repositories && repositories.length > 0 && repositories.map((repo, i) => {
                return (
                    <div key={i} className='repo-card'>
                        {repo.repositoryName}
                    </div>
                )
            })}
        </div>
    );
};

interface IPropsState {
    repositories: IRepository[];
    isLoading: boolean;
}
const mapStateToProps = (state: IRootState) => {
    return {
        repositories: selectRepositories(state),
        isLoading: selectRepositoriesLoading(state),
    };
};

interface IPropsDispatch {
    getRepositories: (filter: ICustomFilter) => void; 
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getRepositories: (filter: ICustomFilter): void => dispatch(getRepos(filter)),
    };
};

interface IPropsOwn {
    filter: ICustomFilter;
}

type IDataReposProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(DataRepos);
