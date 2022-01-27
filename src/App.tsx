import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import { getLocaleInfo } from './utils/locale';

import Footer from './components/shared/Footer/Footer';
import ReposPage from './components/pages/ReposPage/ReposPage';
import DevsPage from './components/pages/DevsPage/DevsPage';

import { WrapIntlProvider } from './utils/providers';

import './App.scss';
import './main.scss';

const App = (props: IAppProps): React.ReactElement => {
    const localeInfo = useMemo(() => getLocaleInfo(), []);
    injectStyle();

    const appComponent = (
        <div className="app" dir={localeInfo.direction}>
            <ToastContainer />
            <BrowserRouter>
                <div className="appContent">
                    <Switch>
                        <Route exact path="/repos">
                            <ReposPage />
                        </Route>
                        <Route exact path="/devs">
                            <DevsPage />
                        </Route>
                        <Route>
                            <ReposPage />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer />
        </div>
    );

    return <WrapIntlProvider locale={localeInfo.locale}>{appComponent}</WrapIntlProvider>;
};

interface IAppProps {}

export default App;
