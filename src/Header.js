import React, { Component } from 'react';
import './Header.css'


class Header extends Component {

    showCpyrightOfFeatures() {
        alert(`
        A lista de estações originalmente foi obtida através do repositório https://gist.github.com/rafaelrinaldi/6a82dd1eceed6dfc7deb

        As informações complementares de cada estação são obtidos através da API da foursquare https://pt.foursquare.com/

        O ícone do menu e do ponteiro do mapa foi obtido através de Icons made by Smashicons (https://www.flaticon.com/authors/smashicons) do site https://www.flaticon.com/, licensiado por is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)`);
    }

    render() {
        return (
            <header className="header">
                <button 
                    className="header-button" 
                    onClick={() => this.props.clickMenu()}>
                </button>

                <button 
                    className="header-resources"
                    onClick={() => this.showCpyrightOfFeatures()}>
                    Recursos <br/>utilizados
                </button>
            </header>
        )
    }
}

export default Header
