import React, {Component} from 'react';

import Header from "./../components/Header";
import Footer from "./../components/Footer";

import TextForm from './../components/TextForm';
import TextArea from './../components/TextArea';
import PhotoForm from './../components/PhotoForm';

import './styles/main.css';

class Main extends Component {
    render() {
        return (
            <div className="mainPage">
                <Header />
                <main className="mainPart">
                    <TextArea />
                    <TextForm />
                </main>
                <PhotoForm />
                <Footer />
            </div>
        );
    }
}

export default Main;
