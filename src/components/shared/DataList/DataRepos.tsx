import React, {Dispatch, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import { FaMobile, FaStar, FaCodeBranch } from 'react-icons/fa';

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
                                    <Button variant='secondary'>
                                        <FaStar/> Star
                                    </Button>
                                </div>
                                <div className='repo-actions-stats'>
                                    <FaStar/> {repo.fullData?.watchers} stars today
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
