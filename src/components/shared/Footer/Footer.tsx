import React, { Dispatch, useEffect } from 'react';

import './Footer.scss';

const Footer = (props: IFooterProps): React.ReactElement => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <small>FOOTER TEXT</small>
            </div>
        </footer>
    );
};

interface IFooterProps {}

export default Footer;
