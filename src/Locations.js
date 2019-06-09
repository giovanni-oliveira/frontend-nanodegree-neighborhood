import React,  {Component} from "react";
import "./Locations.css";


class Locations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="locations">
                <h2 className="locations-title">
                    {this.props.title}
                </h2>
            </div>
        );
    }
}

export default Locations;
