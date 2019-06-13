import React from "react";
import { DebounceInput } from 'react-debounce-input';
import "./Stations.css";

const Stations = ({title, updateMap, stations, activeTabindex, changeStation}) => {
    return (
        <div className="stations">
            <h2 className="stations-title">
                {title}
            </h2>

            <div className="stations-filter">
                <DebounceInput
                    placeholder="Station Location"
                    className="stations-filter-input"
                    alt="Station Location"
                    debounceTimeout={300}
                    onChange={({ target }) => updateMap(target.value.trim())} />
            </div>

            <ul className="stations-wrapper">
                {
                    stations.map(station => (
                        <li
                            key={station.location.venueId}
                            tabIndex={activeTabindex ? 0 : -1}
                            className="station"
                            role="button"
                            aria-pressed={station.pressed || false}
                            onClick={() => changeStation(station)}
                            onKeyUp={({keyCode})=> keyCode === 32 && changeStation(station)}
                        >
                            {station.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Stations;
