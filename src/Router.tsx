import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppBar from './common/components/AppBar/AppBar';
import Drawer from './common/components/Drawer/Drawer';
import HomePage from './pages/HomePage/HomePage';
import TransferPage from './pages/TransferPage/TransferPage';

const MainRouter = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AppBar />
            <Drawer />

            <div style={{marginTop: '70px', marginLeft: '250px'}}>
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/transfer' component={TransferPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default MainRouter;
