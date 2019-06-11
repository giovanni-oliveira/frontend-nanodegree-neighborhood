import React, { Component } from 'react';
import "./MapStation.css";
import pointer from './images/pointer.png';

export default class MapStation extends Component {
    constructor(props) {
        super(props);

        /**
         * Instância do mapa
         * @type {Object} Objeto do tipo `google.maps.Map`
         */
        this.map = {};

        /**
         * Instância dos ponteiros do mapa
         * @type {Object[]} Objeto do tipo `google.maps.Marker`
         */
        this.markers = [];

        /**
         * Instância da janela de informações do marcador
         * @type {Object} Objeto do tipo `google.maps.InfoWindow`
         */
        this.infowindow = {};

        /**
         * Indica se o mapa foi carregado
         * @type {Boolean}
         */
        this.initializedMap = false;
    }

    componentDidMount() {
        this.renderMap();
    }

    componentWillReceiveProps(props) {
        if (!this.initializedMap) return;

        this.setMarkersOnMap(props);
    }

    /**
     * Efetua o carregamento do script do google maps e o adiciona o método `this.initMap` no escopo `window`
     * @memberof MapStation
     * @method renderMap
     */
    renderMap() {
        // Adiciona a callback do script no escopo global
        window.initMap = () => this.initMap();
        loadScriptMap(this.props.apiKey);
    }

    /**
     * Cria a instância do `google.maps.Map`
     * @memberof MapStation
     * @method createMap 
     * @return {Object} Objeto do tipo google.maps.Map
     */
    createMap() {
        return new window.google.maps.Map(
            document.getElementById('map'),
            this.props.mapsConfig
        );
    }

    /**
     * Cria um vetor de `google.maps.Marker`
     * @memberof MapStation
     * @method createMarkers 
     * @param {Object} map Objecto do tipo `google.maps.Map`
     * @return {Object[]} Vetor de objetos do tipo google.maps.Marker
     */
    createMarkers(map) {
        const createMarker = station => new window.google.maps.Marker({
            map,
            position: {
                lat: station.location.lat,
                lng: station.location.lng
            },
            title: station.title,
            animation: window.google.maps.Animation.DROP,
            icon: pointer,
            station,
            venueId: station.location.venueId
        });

        return this.props.stations.map(createMarker);
    }

    /**
     * Cria o conteúdo da janela de informação do ponteiro
     * @memberof MapStation
     * @method createContentInfoWindow 
     * @param {Object} selectedStation
     * @return {String}
     */
    createContentInfoWindow(selectedStation) {
        return `
            <div>
                <strong class="info-likes">
                    ${selectedStation.likes && selectedStation.likes.summary}
                </strong>
                <h2 class="info-name">${selectedStation.name}</h2>

                <address>
                    <p class="info-address">
                        Endereço: ${selectedStation.location && selectedStation.location.address}
                    </p>
                    <p style="padding-bottom: 15px">
                        Contato: ${selectedStation.contact && selectedStation.contact.formattedPhone}
                    </p>
                    <a class="info-more"
                        target="_blank"
                        rel="noopener noreferrer"
                        href=${selectedStation.url}>Mais informações</a>
                </address>
            </div>
        `;
    }

    openInfoWindow(map = this.map, marker, selectedStation) {
        const infowindow = this.infowindow;
        infowindow.setContent(this.createContentInfoWindow(selectedStation));
        infowindow.open(map, marker);
    }

    /**
     * Inicia o mapa no elemento `#map`
     * @memberof MapStation
     * @method initMap 
     */
    initMap() {
        const map = this.createMap();
        const markers = this.createMarkers(map);
        const infowindow = new window.google.maps.InfoWindow();
        const props = this.props;

        markers.forEach(marker => {
            marker.addListener('click', function () {
                props.onMarkerClick(marker.station);
            });
        });

        // Salva as instâncias dos elementos
        this.map = map;
        this.markers = markers;
        this.infowindow = infowindow;
        this.initializedMap = true;
    }

    setMarkersOnMap({ stations, selectedStation }) {
        const markers = this.markers;
        const map = this.map;

        markers.forEach(marker => {
            const station = stations.some(station => station.location.venueId === marker.venueId);

            if (!station) marker.setMap(null);
            if (station && marker.map === null) marker.setMap(map);
        });

        markers.forEach(marker => {
            if (marker.station.pressed) {
                this.openInfoWindow(map, marker, selectedStation);

                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    setTimeout(() => marker.setAnimation(null), 300);
                }
            };
        })
    }

    render() {
        return (
            <div id="map" className="map-container"></div>
        );
    }
};

/**
 * Cria a tag `script` para carregamento do google maps, assim que carregada irá executar a função/método `initMap`
 * @function loadScriptMap
 * @param {String} key 
 */
function loadScriptMap(key = '') {
    const position = window.document.getElementsByTagName('script')[0];

    const script = window.document.createElement('script');
    script.src = `//maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
    script.defer = true;

    position.parentNode.insertBefore(script, position);
}
