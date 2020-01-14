import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.tsx';
import { fitBounds } from 'google-map-react/utils';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
  static defaultProps = {
    zoom: 11,
    node: {
      _latitude: 59.955413,
      _longitude: 30.337844  
    }
  };

  renderMarkers(map, maps) {

  }

  render() {
    if (this.props.node) {
      var lat = this.props.node._latitude;
      var lng = this.props.node._longitude;
      return (
        // Important! Always set the container height explicitly
        <div className="Map" >
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyC5BAQzS-gIlExFcm45_LCijKXxwwCzS94" }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
              center={{lat: lat, lng: lng}}
              defaultZoom={this.props.zoom} >
              <Marker
                lat={lat}
                lng={lng}
                name="My Marker"
                color="blue"
              />
            </GoogleMapReact>
        </div>
      );
    }
    return (
      // Important! Always set the container height explicitly
      <div className="Map" >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyC5BAQzS-gIlExFcm45_LCijKXxwwCzS94" }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
            center={{lat: 59.955413, lng: 30.337844}}
            defaultZoom={11} >
          </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;