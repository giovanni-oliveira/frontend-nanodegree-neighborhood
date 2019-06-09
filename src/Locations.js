import React, { Component } from "react";
import { DebounceInput } from 'react-debounce-input';
import "./Locations.css";


class Locations extends Component {
    constructor(props) {
        super(props);

        this.allStations = props.data;

        this.state = {
            stations: [].concat(props.data)
        }
    }

    changeStation(stationActive) {
        this.setState(({ stations }) => {
            const activeStation = station => {
                station.pressed = stationActive === station;

                return station;
            };

            return { stations: stations.map(activeStation) };
        });

        this.props.activeStation(stationActive);        
    }

    filterStations(query) {
        const stationsFiltered = this.allStations.filter( ({title}) => title.includes(query));        

        this.props.changeStation(stationsFiltered);
        this.setState({
            stations: stationsFiltered
        });
    }

    render() {
        return (
            <div className="locations">
                <h2 className="locations-title">
                    {this.props.title}
                </h2>

                <div className="locations-filter">
                    <DebounceInput
                        placeholder="Station Location"
                        className="locations-filter-input"
                        alt="Station Location"
                        debounceTimeout={300}
                        onChange={({ target }) => this.filterStations(target.value)} />

                    <button className="locations-filter-button">
                        Filter
                    </button>
                </div>

                <ul className="locations-wrapper">
                    {
                        this.state.stations.map(item => (
                            <li
                                key={item.location.venueId}
                                tabIndex="0"
                                className="location"
                                role="button"
                                aria-pressed={item.pressed || false}
                                onClick={() => this.changeStation(item)}
                            >

                                {item.title}

                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Locations;
