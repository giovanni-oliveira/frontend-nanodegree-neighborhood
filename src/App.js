import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import Header from "./Header";
import Locations from "./Locations";
import stations from "./stations.json";

class NeighborhoodApp extends Component {
    constructor() {
        super();

        this.states = {
            stations
        };
    }

    updateMap(filteredStations) {
        console.log(filteredStations);
    }

    activeStation(station) {
        console.log(station);
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <Locations 
                    changeStation={filteredStations => this.updateMap(filteredStations)}
                    activeStation={station => this.activeStation(station)}
                    data={this.states.stations} title={'Estações de São Paulo'}/>
            </div>
        );
    }
}


export default NeighborhoodApp;
