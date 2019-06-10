import React, { Component } from "react";
import { DebounceInput } from 'react-debounce-input';
import "./Locations.css";


class Locations extends Component {
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
                        onChange={({ target }) => this.props.updateMap(target.value)} />
                </div>

                <ul className="locations-wrapper">
                    {
                        this.props.stations.map(station => (
                            <li
                                key={station.location.venueId}
                                tabIndex="0"
                                className="location"
                                role="button"
                                aria-pressed={station.pressed || false}
                                onClick={() => this.props.changeStation(station)}
                            >
                                {station.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Locations;
