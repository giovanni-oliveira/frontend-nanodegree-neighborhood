import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Locations from "./Locations";
import MapStation from "./MapStation";
import stations from "./data/stations.json";
import * as Constants from "./constants";

class NeighborhoodApp extends Component {
    constructor() {
        super();

        /**
         * Dados dinâmicos do componente
         * @type {Object}
         * @property {Object[]} stations Lista de estações disponíveis
         * @property {Boolean} isOpenMenu Estado do menu, sendo: false == `menu-closed` ou true == `menu-opened`
         * @property {Object} selectedStation Estação selecionada
         */
        this.state = {
            stations: [].concat(stations),
            isOpenMenu: false,
            selectedStation: {}
        };

        /**
         * Salva o resultado das 'requests' de informações sobre os locais, para não repetí-las
         * @type {Object}
         */
        this.cachedInfo = {};

        /**
         * Configuração que será utilizada para carregar o google maps
         * @type {Object}
         */
        this.googleMapsConfig = {
            center: { lat: -23.5555348, lng: -46.6359564 },
            zoom: 13
        }
    }

    /**
     * Realiza requisição da API `foursquare` para buscar informações sobre a estação
     * @memberof NeighborhoodApp
     * @method getInfoLocation
     * @param {String} id 
     * @return {Object}
     */
    async getInfoLocation(id) {
        const urlRequest = `${Constants.foursquare.baseURL}venues/${id}?client_id=${Constants.foursquare.clientID}&client_secret=${Constants.foursquare.clientSecret}&v=20180323&limit=1`;

        return await fetch(urlRequest)
            .then(response => response.json())
            .then(({ response: { venue } }) => venue)
            .catch(() => null);
    }

    /**
     * Busca as informações de uma estação e as guarda em `this.cachedInfo` para futuras requisições
     * @memberof NeighborhoodApp
     * @method getStation
     * @param {String} venueId
     * @return {Object}
     */
    async getStation(venueId) {
        this.cachedInfo[venueId] = this.cachedInfo[venueId] || await this.getInfoLocation(venueId);

        return this.cachedInfo[venueId];
    }

    /**
     * Atualiza os `Markers` do map
     * @memberof NeighborhoodApp
     * @method filterStations
     * @param {String} query 
     */
    filterStations(query) {
        const stationsFiltered = stations
            .map(station => {
                station.pressed = false;

                return station;
            })
            .filter(({ title }) => title.includes(query));


        this.setState({
            stations: stationsFiltered
        });
    }

    /**
     * Altera a estação selecionada
     * @memberof NeighborhoodApp
     * @method changeStation
     * @param {Object} stationActive 
     * @param {Boolean} isOpenMenu
     */
    async changeStation(stationActive, isOpenMenu) {
        const stationInfo = await this.getStation(stationActive.location.venueId);

        this.setState(({ stations }) => {
            const setPressed = station => {
                station.pressed = stationActive === station;

                return station;
            };

            return {
                stations: stations.map(setPressed),
                selectedStation: stationInfo,
                isOpenMenu
            };
        });
    }

    /**
     * Abre e fecha a lista com as estações
     * @memberof NeighborhoodApp
     * @method toggleMenu
     */
    toggleMenu() {
        this.setState((prev) => {
            prev.isOpenMenu = !prev.isOpenMenu;

            if(prev.isOpenMenu) {
                document.querySelector('.locations-filter-input').focus();
            }

            return prev;
        });
    }

    render() {
        return (
            <main className={this.state.isOpenMenu ? 'app menu-opened' : 'app menu-closed'} >
                <div className="app-wrapper">
                    <Header clickMenu={() => this.toggleMenu()} />

                    <div className="map-container" role="application" aria-label="Google Maps">
                        <MapStation
                            mapsConfig={this.googleMapsConfig}
                            apiKey={Constants.apiKeyGoogleMaps}
                            onMarkerClick={station => this.changeStation(station)}
                            selectedStation={this.state.selectedStation}
                            stations={this.state.stations} />
                    </div>
                </div>

                <div className="menu-locations" aria-expanded={this.state.isOpenMenu}  arial-label="Lista com as estações de São Paulo">
                    <Locations
                        activeTabindex={this.state.isOpenMenu}
                        changeStation={station => {
                            // Após ativação de um item o menu será fechado para aparelhos com largura menor que 768
                            const isOpenMenu = 768 < window.screen.width;
                            
                            this.changeStation(station, isOpenMenu);
                        }}
                        updateMap={query => this.filterStations(query)}
                        stations={this.state.stations}
                        title={'Estações de São Paulo'} />
                </div>
            </main>
        );
    }
}


export default NeighborhoodApp;
