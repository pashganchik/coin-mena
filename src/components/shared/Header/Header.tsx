import React, { Dispatch, useCallback, useMemo, useState, useEffect } from 'react';

import './Header.scss';

const Header = (props: IHeaderProps): React.ReactElement => {
    return (
        <header className="header">
            <div className="container">HEADER</div>
        </header>
    );
};

interface IHeaderProps {}

export default Header;
