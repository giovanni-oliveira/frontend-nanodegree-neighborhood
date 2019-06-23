import React, { Component } from 'react';
import "./Map.css";
import pointer from '../../../images/pointer.png';

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
    script.onerror = () => alert('O Google maps não foi carregado corretamente.')

    position.parentNode.insertBefore(script, position);
}

class NeighborhoodMap extends Component {
    constructor(props) {
        super(props);

        /**
         * Instância do mapa
         * @type {Object|Boolean} Objeto do tipo `google.maps.Map`
         */
        this.map = false;

        /**
         * Instância dos ponteiros do mapa
         * @type {Object[]} Objetos do tipo `google.maps.Marker`
         */
        this.markers = [];

        /**
         * Instância da janela de informações do marcador
         * @type {Object} Objeto do tipo `google.maps.InfoWindow`
         */
        this.infowindow = {};
    }

    componentDidMount() {
        this.renderMap();
    }

    componentWillReceiveProps(props) {
        if (!this.map) return;

        this.setMarkersOnMap(props);
    }

    /**
     * Efetua o carregamento do script do google maps e o adiciona o método `this.initMap` no escopo `window`
     * @memberof NeighborhoodMap
     * @method renderMap
     */
    renderMap() {
        // Adiciona a callback do script no escopo global
        window.initMap = () => this.initMap();
        loadScriptMap(this.props.apiKey);
    }

    /**
     * Cria a instância do `google.maps.Map` no elemento `.map-container`
     * @memberof NeighborhoodMap
     * @method createMap 
     * @param mapConfig
     * @return {Object} Objeto do tipo google.maps.Map
     */
    createMap(mapConfig) {
        return new window.google.maps.Map(
            document.querySelector('.map-container'),
            mapConfig
        );
    }

    /**
     * Cria um vetor de `google.maps.Marker`
     * @memberof NeighborhoodMap
     * @method createMarkers 
     * @param {Object[]} places Vetor com as informações necessárias para criar um marcador
     * @param {Object} map Objeto do tipo `google.maps.Map`
     * @return {Object[]} Vetor de objetos do tipo google.maps.Marker
     */
    createMarkers(places, map) {
        const markers = places.map(({ location, id, title }) => new window.google.maps.Marker({
            map,
            position: {
                lat: location.lat,
                lng: location.lng
            },
            title,
            animation: window.google.maps.Animation.DROP,
            icon: pointer,
            venueId: id
        }));

        return markers;
    }

    /**
     * Cria o conteúdo da janela de informação do ponteiro
     * @memberof NeighborhoodMap
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
     * @memberof NeighborhoodMap
     * @method initMap 
     */
    initMap() {
        const { mapsConfig, onMarkerClick, stations } = this.props;
        const map = this.createMap(mapsConfig);
        const markers = this.createMarkers(stations, map);
        const infowindow = new window.google.maps.InfoWindow();


        markers.forEach(marker => {
            marker.addListener('click', function () {
                onMarkerClick(marker.venueId);
            });
        });

        // Salva as instâncias dos elementos
        this.map = map;
        this.markers = markers;
        this.infowindow = infowindow;
    }

    setMarkersOnMap({ stations, selectedStation }) {
        const { markers, map } = this;

        markers.forEach(marker => {
            const place = stations.some(station => station.id === marker.venueId);

            if (!place) marker.setMap(null);
            if (place && marker.map === null) marker.setMap(map);
        });

        markers.forEach(marker => {
            // if (marker.station.pressed) {
            //     this.openInfoWindow(map, marker, selectedStation);

            //     if (marker.getAnimation() !== null) {
            //         marker.setAnimation(null);
            //     } else {
            //         marker.setAnimation(window.google.maps.Animation.BOUNCE);
            //         setTimeout(() => marker.setAnimation(null), 300);
            //     }
            // };
        })
    }

    render() {
        return (
            <div id="map" className="map-container"></div>
        );
    }
};

export default NeighborhoodMap;
