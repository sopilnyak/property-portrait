import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './pages/Main';

import MainRouter from './routes';
import './index.css';


const render = () =>
    ReactDOM.render(
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>,
        document.getElementById('root')
    );
render();

document.title = "Easy Sailor";
