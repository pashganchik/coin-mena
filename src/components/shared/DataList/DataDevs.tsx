import React, {Dispatch, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import { FaMobile, FaFire, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

import {
    selectDevelopers,
    selectDevelopersLoading,
    selectFollowExecuted,
    selectError
} from '../../../redux/selectors';
import { IRootState, ICustomFilter, IDeveloper } from '../../../utils/types';
import { getDevs, setFollowDev, setUnfollowDev } from '../../../redux/actions';
import { Const } from '../../../utils/const';

import './DataDevs.scss';

const DataDevs = (props: IDataReposProps): React.ReactElement => {
    const { filter, developers, isLoading, followExecuted, error, getDevelopers, setFollowDev, setUnfollowDev } = props;
    const intl = useIntl();

    useEffect(() => {
        getDevelopers(filter);
    }, [filter]);

    useEffect(() => {
        if (followExecuted) {
            if (!error) {
                toast.success(intl.formatMessage({id: 'success'}));
            } else {
                toast.error(intl.formatMessage({id: 'error'}));
            }
        }
    }, [followExecuted]);

    const hasData = developers && developers.length > 0;

    const handleSwitchFollow = (devId: number, isFollowed?: boolean) => {
        if (isFollowed) {
            setUnfollowDev(devId);
        } else {
            setFollowDev(devId);
        }
    }

    return (
        <div className="data-devs">
            {isLoading && <span><FormattedMessage id='loading'/></span>}

            {!hasData && !isLoading && <span><FormattedMessage id='no-data'/></span>}

            {hasData && !isLoading && developers.map((dev, i) => {
                const repo = dev.fullRepos && dev.fullRepos[0];
                const devIsFollowedByCurrent = dev.fullFollowers.find(x => x.id === Const.FakeCurrentUserId) != null;

                return (
                    <div key={i} className='dev'>
                        <Row>
                            <Col xs={4} className='d-flex'>
                                <div className='dev-id'>{i}</div>
                                <div className='dev-icon'>
                                    <img src={dev.avatar_url}></img>
                                </div>
                                <div className='dev-name'>
                                    <a href={dev.url}>{dev.fullData?.name || dev.login}</a>
                                    <h6>{dev.login}</h6>
                                </div>
                            </Col>
                            <Col xs={4}>
                                {repo && (
                                    <div className='dev-repo'>
                                        <div className='dev-repo-title'>
                                            <FaFire/>
                                            Popular Repo
                                        </div>
                                        <div className='dev-repo-name'>
                                            <FaMobile/>
                                            <a href={repo.url}>{repo.full_name}</a>
                                        </div>
                                        <div className='dev-repo-description'>
                                            {repo.description}
                                        </div>
                                    </div>
                                )}
                            </Col>
                            <Col xs={4}>
                                <div className='dev-actions'>
                                    { dev.fullData?.hireable && (
                                        <Button variant='secondary' className='dev-actions__sponsor'>
                                            <FaHeart/>
                                            <FormattedMessage id='sponsor'/>
                                        </Button>
                                    )}

                                    <Button variant='secondary' onClick={() => handleSwitchFollow(dev.id, devIsFollowedByCurrent)}>
                                        { devIsFollowedByCurrent 
                                            ? <FormattedMessage id='unfollow'/>
                                            : <FormattedMessage id='follow'/>
                                        } 
                                    </Button>
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
    developers: IDeveloper[];
    isLoading: boolean;
    followExecuted: boolean;
    error: boolean;
}
const mapStateToProps = (state: IRootState) => {
    return {
        developers: selectDevelopers(state),
        isLoading: selectDevelopersLoading(state),
        followExecuted: selectFollowExecuted(state),
        error: selectError(state),
    };
};

interface IPropsDispatch {
    getDevelopers: (filter: ICustomFilter) => void;
    setFollowDev: (devId: number) => void;
    setUnfollowDev: (devId: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getDevelopers: (filter: ICustomFilter): void => dispatch(getDevs(filter)),
        setFollowDev: (devId: number): void => dispatch(setFollowDev(devId)),
        setUnfollowDev: (devId: number): void => dispatch(setUnfollowDev(devId)),
    };
};

interface IPropsOwn {
    filter: ICustomFilter;
}

type IDataReposProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(DataDevs);
