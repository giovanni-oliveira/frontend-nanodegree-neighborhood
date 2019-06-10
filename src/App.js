import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Locations from "./Locations";
import GoogleApiWrapper from "./MapStation";
import stations from "./data/stations.json";

class NeighborhoodApp extends Component {
    constructor() {
        super();

        /**
         * Dados dinâmicos do componente
         * @type {Object}
         * @property {Object[]} stations Lista de estações disponíveis
         * @property {String} stateMenu Estado do menu, sendo: `menu-closed` ou `menu-open`
         * @property {Object} activeMarker Referência do `Marker` ativado
         * @property {Boolean} showingInfoWindow Mostrar informação sobre o local
         * @property {Object} selectedStation Estação selecionada
         */
        this.state = {
            stations: [],
            stateMenu: 'menu-closed',
            activeMarker: {},
            showingInfoWindow: false,
            selectedStation: {}
        };

        /**
         * Salva o resultado das 'requests' de informações sobre os locais, para não repetí-las
         * @type {Object}
         */
        this.cachedInfo = {};
    }

    componentDidMount() {
        const addRef = station => {
            station.ref = React.createRef();

            return station;
        };

        this.setState({
            stations: stations.map(addRef)
        });
    }

    /**
     * Realiza requisição da API `foursquare` para buscar informações sobre a estação
     * @memberof NeighborhoodApp
     * @method getInfoLocation
     * @param {String} id 
     * @return {Object}
     */
    async getInfoLocation(id) {
        const urlRequest = `//api.foursquare.com/v2/venues/${id}?client_id=M1JTMND3WDZIPHEQAELXZ2CNJR01UQZLQ5NZZLCP2SSOYA4H&client_secret=WBXIT2RVVMRC3HXGQX4NEEQQBO5UC5WL5E5FXT313A0ZQRI0&v=20180323&limit=1`;

        return await fetch(urlRequest)
            .then(response => response.json())
            .then(({ response: { venue } }) => venue)
            .catch(() => null);
    }

    /**
     * As requisições da API `foursquare` são limitadas, então, para testes é mockado dados de uma estação.
     * @memberof NeighborhoodApp
     * @method getMockData
     * @return {Object}
     */
    async getMockData() {
        const { default: { response: { venue } } } = await import("./data/mockdata.json");

        return venue;
    }

    /**
     * Busca as informações de uma estação e as guarda em `this.cachedInfo` para futuras requisições
     * @memberof NeighborhoodApp
     * @method getStation
     * @param {String} venueId
     */
    async getStation(venueId) {
        this.cachedInfo[venueId] = this.cachedInfo[venueId] || await this.getInfoLocation(venueId) || await this.getMockData();

        return this.cachedInfo[venueId];
    }

    /**
     * Exibe as informações da estação selecionada
     * @memberof NeighborhoodApp
     * @method onMarkerClick
     * @param {Object} marker 
     * @param {String} venueId 
     */
    async onMarkerClick(marker, venueId) {
        const station = await this.getStation(venueId);

        this.setState({
            selectedStation: station,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    /**
     * Desativa o `InfoWindow`
     * @memberof NeighborhoodApp
     * @method disableInfoWindow
     */
    disableInfoWindow() {
        if (!this.state.showingInfoWindow) return;

        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
    };

    /**
     * Ativa o `InfoWindow` com os dados da estação selecionada
     * @memberof NeighborhoodApp
     * @method showInfoWindow
     */
    async showInfoWindow(selectedStation) {
        const station = await this.getStation(selectedStation.location.venueId);

        this.setState({
            selectedStation: station,
            activeMarker: selectedStation.ref.current.marker,
            showingInfoWindow: true
        })
    }

    /**
     * Atualiza os `Markers` do map
     * @memberof NeighborhoodApp
     * @method filterStations
     * @param {String} query 
     */
    filterStations(query) {
        const stationsFiltered = stations.filter(({ title }) => title.includes(query));

        this.setState({
            stations: stationsFiltered
        });

        this.disableInfoWindow();
    }

    /**
     * Altera a estação selecionada
     * @memberof NeighborhoodApp
     * @method changeStation
     * @param {Object} stationActive 
     */
    async changeStation(stationActive) {
        const updateAttrPressed = ({ stations }) => {
            const setPressed = station => {
                station.pressed = stationActive === station;

                return station;
            };

            return { stations: stations.map(setPressed) };
        };

        await this.showInfoWindow(stationActive);
        this.setState(updateAttrPressed);
    }

    /**
     * Abre e fecha a lista com as estações
     * @memberof NeighborhoodApp
     * @method toggleMenu
     */
    toggleMenu() {
        this.setState(({ stateMenu }) => ({ stateMenu: stateMenu === 'menu-opened' ? 'menu-closed' : 'menu-opened' }));
    }

    render() {
        return (
            <main className={'app ' + this.state.stateMenu} >
                <Locations
                    changeStation={station => this.changeStation(station)}
                    updateMap={query => this.filterStations(query)}
                    stations={this.state.stations}
                    title={'Estações de São Paulo'} />

                <div className="app-wrapper">
                    <Header clickMenu={() => this.toggleMenu()} />

                    <GoogleApiWrapper
                        disableInfoWindow={() => this.disableInfoWindow()}
                        onMarkerClick={(marker, venueId) => this.onMarkerClick(marker, venueId)}
                        selectedStation={this.state.selectedStation}
                        updateMarkerActive={state => this.setState(state)}
                        activeMarker={this.state.activeMarker}
                        isVisible={this.state.showingInfoWindow}
                        stations={this.state.stations} />
                </div>
            </main>
        );
    }
}


export default NeighborhoodApp;
