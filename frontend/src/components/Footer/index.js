import React, { Component } from 'react';
import Button from "./../Button";
import './styles.css';

class Header extends Component {render() {
        return (
            <footer>
                <div class="nextStep">{(window.location.href !== 'http://localhost:3000/result') && <Button
                    parentState={this.callback}
                />}</div>
                <div class="copyright">Powered by Restb.ai technologies</div>


            </footer>
        );
    }
}

export default Header;