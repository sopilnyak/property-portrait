import React, {Component} from 'react';

import Header from "./../components/Header";
import Footer from "./../components/Footer";

import Warning from './../components/Warning';
import TextForm from './../components/TextForm';
import TextArea from './../components/TextArea';
import PhotoForm from './../components/PhotoForm';
import Button from './../components/Button';

import './styles/main.css';
import TypeForm from "./TypeForm";

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
