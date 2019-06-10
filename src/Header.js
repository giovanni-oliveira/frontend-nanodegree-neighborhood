import React, { Component } from 'react';
import './Header.css'


class Header extends Component {
    render() {
        return (
            <header className="header">
                <button 
                    className="header-button" 
                    onClick={() => this.props.clickMenu()}>
                </button>
            </header>
        )
    }
}

export default Header
