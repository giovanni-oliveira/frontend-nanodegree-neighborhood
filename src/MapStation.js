import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapStation extends Component {
    render() {
        const styleMap = {
            position: 'relative',
            width: '100%',
            height: '92vh'
        };

        return (
            <div role="application" style={styleMap}>
                <Map
                    google={this.props.google}
                    zoom={13}
                    initialCenter={{ lat: -23.5555348, lng: -46.6359564 }}
                    onClick={() => this.props.disableInfoWindow()}>

                    {
                        this.props.stations.map(({ ref, location: { venueId, address, lat, lng } }) => (
                            <Marker
                                ref={ref}
                                key={venueId}
                                onClick={(props, marker) => this.props.onMarkerClick(marker, venueId)}
                                name={address}
                                venueId={venueId}
                                position={{ lat, lng }} />
                        ))
                    }

                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.isVisible}>
                        <div>
                            <strong
                                style={{ color: '#0282a5', textAlign: 'center' }}>
                                ({this.props.selectedStation.likes && this.props.selectedStation.likes.summary})
                            </strong>
                            <h2 style={{ paddingBottom: '10px' }}>{this.props.selectedStation.name}</h2>

                            <address>
                                <p style={{ paddingBottom: '10px' }}>
                                    Endereço: {this.props.selectedStation.location && this.props.selectedStation.location.address}
                                </p>
                                <p style={{ paddingBottom: '15px' }}>
                                    Contato: {this.props.selectedStation.contact && this.props.selectedStation.contact.formattedPhone}
                                </p>
                                <a
                                    style={{
                                        fontStyle: 'normal',
                                        fontWeight: 'bold',
                                        color: '#ea4335'
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={this.props.selectedStation.url}>Mais informações</a>
                            </address>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyATs9UCWYFn2Cx-P0mPjmlpuFmaJI33Nz4',
    v: '1',
    libraries: ['places']
})(MapStation);
