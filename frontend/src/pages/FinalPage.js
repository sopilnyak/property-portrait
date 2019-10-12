import React, {Component} from 'react';

import Header from "./../components/Header";
import Footer from "./../components/Footer";

import RedactedText from "./../components/RedactedText";
import ShareSN from "./../components/ShareSN";

import './styles/main.css';

class FinalPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mainPage">
                    <RedactedText />
                    <ShareSN />
                </div>
                <Footer />
            </div>
        );
    }
}

export default FinalPage;
