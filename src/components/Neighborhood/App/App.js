import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import NeighborhoodPlaces from '../Places/Places';
import MapStation from '../Map/Map';
import * as Constants from '../../../constants';

class NeighborhoodApp extends Component {
    constructor() {
        super();

        /**
         * Dados dinâmicos do componente
         * @type {Object}
         * @property {Object[]} stations Lista de estabelecimentos disponíveis
         * @property {Boolean} isOpenMenu Estado do menu, sendo: false == `menu-closed` ou true == `menu-opened`
         * @property {Object} selectedStation Estação selecionada
         */
        this.state = {
            stations: [],
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
            zoom: 17
        }
    }

    componentDidMount() {
        // const { lat, lng } = this.googleMapsConfig.center;
        // const { baseURL, clientID, clientSecret, version } = Constants.foursquare;
        // const url = `${baseURL}venues/search?client_id=${clientID}&client_secret=${clientSecret}&limit=10&ll=${lat},${lng}&v=${version}`;

        const stations = JSON.parse(`[{"id":"4c9cd6fe9975a1437eea35cf","name":"YoGuTi","contact":{},"location":{"address":"R. Galvão Bueno, 143","crossStreet":"R. dos Estudantes","lat":-23.55528293966281,"lng":-46.635327771139615,"labeledLatLngs":[{"label":"display","lat":-23.55528293966281,"lng":-46.635327771139615}],"distance":70,"postalCode":"01506-000","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["R. Galvão Bueno, 143 (R. dos Estudantes)","São Paulo, SP","01506-000","Brasil"]},"categories":[{"id":"512e7cae91d4cbb4e5efe0af","name":"Loja de Iogurte Gelado","pluralName":"Lojas de Iogurte Gelado","shortName":"Iogurte","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/food/frozenyogurt_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4b3c92e8f964a520428525e3","name":"Praça da Liberdade","contact":{},"location":{"address":"Pç. da Liberdade","lat":-23.555425768425515,"lng":-46.63543857002764,"distance":54,"postalCode":"01503-010","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Pç. da Liberdade","São Paulo, SP","01503-010","Brasil"]},"categories":[{"id":"4bf58dd8d48988d164941735","name":"Praça","pluralName":"Praças","shortName":"Praça","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/plaza_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4c378d3b18e72d7fe5bf16f5","name":"Subway","contact":{},"location":{"address":"Av. Liberdade, 180","lat":-23.55528762196589,"lng":-46.63617924637124,"labeledLatLngs":[{"label":"display","lat":-23.55528762196589,"lng":-46.63617924637124}],"distance":35,"postalCode":"01505-001","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Av. Liberdade, 180","São Paulo, SP","01505-001","Brasil"]},"categories":[{"id":"4bf58dd8d48988d1c5941735","name":"Sanduicheria","pluralName":"Sanduicherias","shortName":"Sanduíche","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/food/deli_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4b57ab8ef964a520df3a28e3","name":"Bentô House","contact":{},"location":{"address":"Pç. da Liberdade, 266","crossStreet":"R.dos Estudantes","lat":-23.555351376572762,"lng":-46.6355512557214,"labeledLatLngs":[{"label":"display","lat":-23.555351376572762,"lng":-46.6355512557214}],"distance":46,"postalCode":"01503-010","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Pç. da Liberdade, 266 (R.dos Estudantes)","São Paulo, SP","01503-010","Brasil"]},"categories":[{"id":"4bf58dd8d48988d142941735","name":"Restaurante Asiático","pluralName":"Restaurantes Asiáticos","shortName":"Asiático","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/food/asian_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4d41b0c3bd53f04d06f44f15","name":"Tunibra Travel","contact":{},"location":{"address":"Pça. da Liberdade, 170","crossStreet":"vizinho da estação Liberdade","lat":-23.555258426766663,"lng":-46.6359188588781,"labeledLatLngs":[{"label":"display","lat":-23.555258426766663,"lng":-46.6359188588781}],"distance":31,"postalCode":"01503-010","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Pça. da Liberdade, 170 (vizinho da estação Liberdade)","São Paulo, SP","01503-010","Brasil"]},"categories":[{"id":"4bf58dd8d48988d1f6931735","name":"Viagem em Geral","pluralName":"Viagem em Geral","shortName":"Viagem","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/travel/default_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4dfe0f36fa76c83b6e820ca1","name":"Capela Santa Cruz dos Enforcados","contact":{},"location":{"address":"Av. da Liberdade, 113-151","lat":-23.555577200724528,"lng":-46.63583957007728,"labeledLatLngs":[{"label":"display","lat":-23.555577200724528,"lng":-46.63583957007728}],"distance":12,"postalCode":"01503-000","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Av. da Liberdade, 113-151","São Paulo, SP","01503-000","Brasil"]},"categories":[{"id":"4bf58dd8d48988d132941735","name":"Igreja","pluralName":"Igrejas","shortName":"Igreja","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/building/religious_church_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4e231190628469a574265590","name":"Liberdade","contact":{},"location":{"lat":-23.55859109601508,"lng":-46.63508046004853,"distance":351,"cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["São Paulo, SP","Brasil"]},"categories":[{"id":"4f2a25ac4b909258e854f55f","name":"Bairro","pluralName":"Bairros","shortName":"Bairro","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/neighborhood_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4dc5a085d164eb9c9ff48444","name":"Casas Bahia","contact":{},"location":{"address":"Pç. da Liberdade, 200","lat":-23.55564870809053,"lng":-46.636523573785794,"labeledLatLngs":[{"label":"display","lat":-23.55564870809053,"lng":-46.636523573785794}],"distance":59,"postalCode":"01316-060","cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Pç. da Liberdade, 200","São Paulo, SP","01316-060","Brasil"]},"categories":[{"id":"4bf58dd8d48988d1f8941735","name":"Mobiliário / Utensílios","pluralName":"Mobiliários / Utensílios","shortName":"Mobiliário / Utensílios","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/shops/furniture_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"4b9d3283f964a5207a9836e3","name":"Estação Liberdade (Metrô)","contact":{},"location":{"address":"Pç. da Liberdade, 133","crossStreet":"Linha 1/Azul","lat":-23.555199185560245,"lng":-46.635612115436125,"labeledLatLngs":[{"label":"display","lat":-23.555199185560245,"lng":-46.635612115436125}],"distance":51,"cc":"BR","neighborhood":"Liber","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["Pç. da Liberdade, 133 (Linha 1/Azul)","São Paulo, SP","Brasil"]},"categories":[{"id":"4bf58dd8d48988d1fd931735","name":"Estação de Metrô","pluralName":"Estações de Metrô","shortName":"Metrô","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/travel/subway_","suffix":".png"},"primary":true}],"verified":true,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false},{"id":"50aa5fc9e4b007904c4ae9ce","name":"Lotérica Trade center","contact":{},"location":{"lat":-23.557079348026644,"lng":-46.63547626596446,"labeledLatLngs":[{"label":"display","lat":-23.557079348026644,"lng":-46.63547626596446}],"distance":178,"cc":"BR","city":"São Paulo","state":"SP","country":"Brasil","formattedAddress":["São Paulo, SP","Brasil"]},"categories":[{"id":"503287a291d4c4b30a586d65","name":"Serviço Financeiro / Jurídico","pluralName":"Serviços Financeiros / Jurídicos","shortName":"Financeiro / Jurídico","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/shops/financial_","suffix":".png"},"primary":true}],"verified":false,"stats":{"tipCount":0,"usersCount":0,"checkinsCount":0,"visitsCount":0},"beenHere":{"count":0,"lastCheckinExpiredAt":0,"marked":false,"unconfirmedCount":0},"hereNow":{"count":0,"summary":"Não há ninguém aqui","groups":[]},"referralId":"v-1561079300","venueChains":[],"hasPerk":false}]`);

        this.setState({ stations });

        // fetch(url)
        //     .then(data => data.json())
        //     .then(({ response: { venues } }) => this.setState({ stations: venues }))
        //     .catch(error => console.log(error));
    }

    /**
     * Realiza requisição da API `foursquare` para buscar informações sobre a estação
     * @memberof NeighborhoodApp
     * @method getInfoLocation
     * @param {String} id 
     * @return {Object}
     */
    async getInfoLocation(id) {
        const { baseURL, clientID, clientSecret } = Constants.foursquare;
        const urlRequest = `${baseURL}venues/${id}?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=1`;

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
        const filterPlace = place => {
            place.pressed = false;
            place.hide = !place.name.includes(query);

            return place;
        };

        this.setState(({ stations }) => ({ stations: stations.map(filterPlace) }));
    }

    /**
     * Altera o local selecionado
     * @memberof NeighborhoodApp
     * @method changePlace
     * @param {Number} venueID 
     * @param {Boolean} isOpenMenu
     */
    async changePlace(venueID, isOpenMenu = true) {        
        const placeInfo = await this.getStation(venueID);
        
        this.setState(({ stations }) => {
            const setPressed = station => {               
                station.pressed = venueID === station.id;

                return station;
            };

            return {
                stations: stations.map(setPressed),
                selectedStation: placeInfo,
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

            if (prev.isOpenMenu) {
                document.querySelector('.places-filter-input').focus();
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
                            onMarkerClick={venueID => this.changePlace(venueID)}
                            selectedStation={this.state.selectedStation}
                            stations={this.state.stations} />
                    </div>
                </div>

                <div className="menu-stations" aria-expanded={this.state.isOpenMenu} arial-label="Lista com as estações de São Paulo">
                    <NeighborhoodPlaces
                        activeTabindex={this.state.isOpenMenu}
                        changePlace={venueId => {
                            // Após ativação de um item o menu será fechado para aparelhos com largura menor que 768
                            const isOpenMenu = 768 < window.screen.width;
                            console.log(venueId);
                            
                            this.changePlace(venueId, isOpenMenu);
                        }}
                        updateMap={query => this.filterStations(query)}
                        places={this.state.stations}
                        title={'Estações de São Paulo'} />
                </div>
            </main>
        );
    }
}


export default NeighborhoodApp;
