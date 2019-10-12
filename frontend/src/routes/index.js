import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import TypeForm from "./../pages/TypeForm";
import Main from "./../pages/Main";
import Result from "./../pages/Result";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/result' component={Result} />
    </Switch>
);

export default withRouter(MainRouter);