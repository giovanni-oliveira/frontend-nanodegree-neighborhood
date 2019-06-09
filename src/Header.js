import React, { Component } from 'react';
import './Header.css'


class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <button className="header-button" onClick={() => this.toggleMenu()}>
                    X
                </button>
            </header>
        )
    }
}

export default Header
