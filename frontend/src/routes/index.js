import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import Main from "./../pages/Main";
import FinalPage from "./../pages/FinalPage";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/result' component={FinalPage} />
    </Switch>
);

export default withRouter(MainRouter);