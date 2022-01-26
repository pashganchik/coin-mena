import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { getLocaleInfo } from './utils/locale';

import Header from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';
import HomePage from './components/pages/HomePage/HomePage';

import { WrapIntlProvider } from './utils/providers';
import { Const } from './utils/const';

import './App.scss';
import './main.scss';

const App = (props: IAppProps): React.ReactElement => {
    const localeInfo = useMemo(() => getLocaleInfo(), []);

    const appComponent = (
        <div className="app" dir={localeInfo.direction}>
            <ToastContainer />
            <BrowserRouter>
                <Header />
                <div className="appContent">
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
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
