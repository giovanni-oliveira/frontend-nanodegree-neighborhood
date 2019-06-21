import React from "react";
import { DebounceInput } from 'react-debounce-input';
import "./Places.css";

const NeighborhoodPlaces = ({ title, updateMap, places, activeTabindex, changePlace }) => {

    const _places = places.map(({ id, hide, name, pressed }) => (
        <li
            key={id}
            role="button"
            tabIndex={activeTabindex ? 0 : -1}
            className={`place ${hide && 'place-hide'}`}
            aria-pressed={pressed || false}
            onClick={() => changePlace(id)}
            onKeyUp={({ keyCode }) => keyCode === 32 && changePlace(id)}
        >
            {name}
        </li>
    ));

    return (
        <div className="places">
            <h2 className="places-title">
                {title}
            </h2>

            <div className="places-filter">
                <DebounceInput
                    placeholder="Station Location"
                    className="places-filter-input"
                    alt="Station Location"
                    debounceTimeout={300}
                    onChange={({ target }) => updateMap(target.value.trim())} />
            </div>

            <ul className="places-wrapper">
                {_places}
            </ul>
        </div>
    );
};

export default NeighborhoodPlaces;
