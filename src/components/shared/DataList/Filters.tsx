import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { WorkModeEnum, ICustomFilter } from '../../../utils/types';
import { Dropdown, DropdownButton, FormGroup } from 'react-bootstrap';
import { Const } from '../../../utils/const';

import './Filters.scss';

const Filters = (props: IDataListProps): React.ReactElement => {
    const { workMode, onSetCustomFilter } = props;
    const intl = useIntl();
    const anyOption = intl.formatMessage({ id: 'any-option' });

    const [spokenLanguage, setSpokenLanguage] = useState(anyOption);
    const [language, setLanguage] = useState(anyOption);
    const [dateRange, setDateRange] = useState(anyOption);

    const handleSelectSpokenLanguage = (value: string) => {
        setSpokenLanguage(value);
    };
    const handleSelectLanguage = (value: string) => {
        setLanguage(value);
    };
    const handleSelectDateRange = (value: string) => {
        setDateRange(value);
    };

    useEffect(() => {
        const filter = getCustomFilter();
        onSetCustomFilter(filter);
    }, [spokenLanguage, language, dateRange]);

    const getCustomFilter = (): ICustomFilter => {
        return {
            spokenLanguage: spokenLanguage === anyOption ? '' : spokenLanguage,
            language: language === anyOption ? '' : language,
            dateRange: dateRange === anyOption ? '' : dateRange,
        };
    };

    return (
        <div className="data-filters">
            {workMode === WorkModeEnum.REPOS && (
                <FormGroup className="data-filters__item">
                    <FormattedMessage id="label-spoken-language" />
                    <DropdownButton className="data-filters__item-dropdown" menuVariant="dark" title={spokenLanguage}>
                        {[anyOption, ...Const.SpokenLanguages].map((x) => (
                            <Dropdown.Item
                                key={x}
                                onClick={() => handleSelectSpokenLanguage(x)}
                                active={spokenLanguage === x}
                            >
                                {x}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </FormGroup>
            )}

            <FormGroup className="data-filters__item">
                <FormattedMessage id="label-language" />

                <DropdownButton className="data-filters__item-dropdown" menuVariant="dark" title={language}>
                    {[anyOption, ...Const.Languages].map((x) => (
                        <Dropdown.Item key={x} onClick={() => handleSelectLanguage(x)} active={language === x}>
                            {x}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </FormGroup>

            <FormGroup className="data-filters__item">
                <FormattedMessage id="label-date-range" />
                <DropdownButton className="data-filters__item-dropdown" menuVariant="dark" title={dateRange}>
                    {[anyOption, ...Const.DateRanges].map((x) => (
                        <Dropdown.Item key={x} onClick={() => handleSelectDateRange(x)} active={dateRange === x}>
                            {x}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </FormGroup>
        </div>
    );
};

interface IPropsOwn {
    workMode: WorkModeEnum;
    onSetCustomFilter: (filter: ICustomFilter) => void;
}

type IDataListProps = IPropsOwn;

export default Filters;
