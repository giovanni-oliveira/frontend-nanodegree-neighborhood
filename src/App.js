import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import Header from "./Header";
import Locations from "./Locations";
import stations from "./stations.json";

class NeighborhoodApp extends Component {
    constructor() {
        this.states = {
            stations
        };
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <Locations title={'Estações de São Paulo'}/>
            </div>
        );
    }
}


export default NeighborhoodApp;
