import React, {Component} from 'react';

import Header from "./../components/Header";
import Footer from "./../components/Footer";

import TextForm from './../components/TextForm';

import './styles/main.css';

class Main extends Component {
    render() {
        return (
            <div className="mainPage">
                <Header />
                <TextForm />
                <Footer />
            </div>
        );
    }
}

export default Main;
