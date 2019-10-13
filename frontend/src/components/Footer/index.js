import React, { Component } from 'react';
import Button from "./../Button";
import './styles.css';

class Header extends Component {render() {
        return (
            <footer>
                <div className="nextStep">
                    {!window.location.href.includes( '/result') && <Button/>}
                </div>
                <div className="copyright">Powered by Restb.ai technologies</div>
            </footer>
        );
    }
}

export default Header;