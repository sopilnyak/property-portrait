import React, { Component } from 'react';
import Button from "./../Button";
import './styles.css';

class Header extends Component {render() {
        return (
            <footer>
                {!window.location.href.includes('/result')
                    ? <div>
                        <div className="nextStep">
                            <Button/>
                        </div>
                        <div className="copyright">Powered by Restb.ai technologies</div>
                    </div>
                    : <p className="copyright">Powered by Restb.ai technologies</p>
                }
            </footer>
        );
    }
}

export default Header;