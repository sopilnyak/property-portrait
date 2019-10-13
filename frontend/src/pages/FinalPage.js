import React, {Component} from 'react';
import {FacebookShareButton, TwitterShareButton, GooglePlusShareButton} from "react-simple-share";

import {adText} from './../components/TextForm';

import Header from "./../components/Header";
import Footer from "./../components/Footer";
import './styles/finalPage.css';

class FinalPage extends Component {
    constructor(props) {
        super(props);

        this.state={adText};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({adText: event.target.value});
    }

    render() {
        return (
            <div>
                <Header />
                <div className="finalPage">
                    <div className="RedactedText">
                        <textarea
                            name="textarea"
                            cols="50"
                            rows="20"

                            value={this.state.adText}
                            onChange={this.handleChange}
                        >
                            {this.state.adText}
                        </textarea>
                    </div>
                    <div className="shareSN">
                        <FacebookShareButton
                            url=''
                            text={this.state.adText}
                            color="#3B5998"
                            size="48px"
                        /> <br />
                        <TwitterShareButton
                            url=''
                            color="#1DA1F2"
                            size="48px"
                            text={this.state.adText}
                            hashtags=""
                            via=""
                            related=""
                        /> <br />
                        <GooglePlusShareButton
                            text={this.state.adText}
                            url=""
                            color="#DB4437"
                            size="48px"
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default FinalPage;
