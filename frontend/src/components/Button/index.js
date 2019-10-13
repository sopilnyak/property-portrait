import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './styles.css';

class Button extends Component {

    render() {
        return (
            <Link to="/result">
                <button
                    className="button"
                >
                    Finalize
                </button>
            </Link>
        );
    }
}

export default Button;
