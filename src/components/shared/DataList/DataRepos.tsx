import React, {Dispatch, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import { FaMobile, FaStar, FaCodeBranch } from 'react-icons/fa';
import { toast } from 'react-toastify';

import {
    selectRepositories,
    selectRepositoriesLoading,
    selectStarExecuted,
    selectError
} from '../../../redux/selectors';
import { IRootState, ICustomFilter, IRepository } from '../../../utils/types';
import { getRepos, setStarRepo } from '../../../redux/actions';

import './DataRepos.scss';

const DataRepos = (props: IDataReposProps): React.ReactElement => {
    const { filter, repositories, isLoading, starExecuted, error, getRepositories, setStarRepo } = props;
    const intl = useIntl();

    useEffect(() => {
        getRepositories(filter);
    }, [filter]);

    useEffect(() => {
        if (starExecuted) {
            if (!error) {
                toast.success(intl.formatMessage({id: 'success'}));
            } else {
                toast.error(intl.formatMessage({id: 'error'}));
            }
        }
    }, [starExecuted]);

    const hasData = repositories && repositories.length > 0;

    return (
        <div className="data-repos">
            {isLoading && <span><FormattedMessage id='loading'/></span>}

            {!hasData && !isLoading && <span><FormattedMessage id='no-data'/></span>}

            {hasData && !isLoading && repositories.map((repo, i) => {
                return (
                    <div key={i} className='repo'>
                        <Row>
                            <Col xs={8}>
                                <div className='repo-name'>
                                    <FaMobile/>
                                    <a href={repo.url}>{repo.full_name}</a>
                                </div>
                                <div className='repo-description'>{repo.description}</div>
                                <div className='repo-info'>
                                    <div className='repo-info-language'>{repo.fullData?.language || 'Empty'}</div>
                                    <div className='repo-info-watchers'>
                                        <FaStar/>
                                        {repo.fullData?.watchers_count || 0}
                                    </div>
                                    <div className='repo-info-forks'>
                                        <FaCodeBranch/>
                                        {repo.fullData?.forks_count || 0}
                                    </div>
                                    <div className='repo-info-users'>
                                        Built by: &nbsp;
                                        <img src={repo.owner?.avatar_url}></img>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={4} className='repo-actions'>
                                <div className='repo-actions-buttons'>
                                    <Button variant='secondary' onClick={() => setStarRepo(repo.id)}>
                                        <FaStar/> Star
                                    </Button>
                                </div>
                                <div className='repo-actions-stats'>
                                    <FaStar/> {repo.fullData?.watchers} stars {filter.dateRange}
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </div>
    );
};

interface IPropsState {
    repositories: IRepository[];
    isLoading: boolean;
    starExecuted: boolean;
    error: boolean;
}
const mapStateToProps = (state: IRootState) => {
    return {
        repositories: selectRepositories(state),
        isLoading: selectRepositoriesLoading(state),
        starExecuted: selectStarExecuted(state),
        error: selectError(state),
    };
};

interface IPropsDispatch {
    getRepositories: (filter: ICustomFilter) => void;
    setStarRepo: (repoId: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getRepositories: (filter: ICustomFilter): void => dispatch(getRepos(filter)),
        setStarRepo: (repoId: number): void => dispatch(setStarRepo(repoId)),
    };
};

interface IPropsOwn {
    filter: ICustomFilter;
}

type IDataReposProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(DataRepos);
