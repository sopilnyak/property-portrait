import React, { Component } from 'react';
import Button from "./../Button";
import './styles.css';

class Header extends Component {render() {
        return (
            <footer>
                {(window.location.href !== 'http://localhost:3000/result') && <Button
                    parentState={this.callback}
                />}
            </footer>
        );
    }
}

export default Header;