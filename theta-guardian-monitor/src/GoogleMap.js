import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
// import Marker from './Marker.tsx';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
  static defaultProps = {
    zoom: 11,
    node: {
      _latitude: 59.955413,
      _longitude: 30.337844  
    }
  };

  constructor(props) {
    super(props);
    this.mapObj = null;
    this.mapApi = null;
    this.init = false;
  }

  InitMaps(map, maps) {
    this.mapObj = map;
    this.mapApi = maps;
    this.init = true;
  }

  renderMarkers() {
    if (this.props.node) {
      new this.mapApi.Marker({position : {lat: this.props.node._latitude, lng: this.props.node._longitude}, map: this.mapObj, icon: {url:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}});
    }
    if (this.props.connected) {
      this.props.connected.map((num) => {
        let cur = this.props.nodes[num];
        if (cur) {
          new this.mapApi.Marker({position : {lat: cur._latitude, lng: cur._longitude}, map: this.mapObj});
        }
      });
    }
  }

  render() {
    if (this.init) {
      this.renderMarkers();
    }
    if (this.props.node) {
      var lat = this.props.node._latitude;
      var lng = this.props.node._longitude;
      return (
        // Important! Always set the container height explicitly
        <div className="Map" >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyC5BAQzS-gIlExFcm45_LCijKXxwwCzS94" }}
            yesIWantToUseGoogleMapApiInternals = {true}
            onGoogleApiLoaded={({ map, maps }) => this.InitMaps(map, maps)}
            center={{lat: lat, lng: lng}}
            zoom={this.props.zoom} >
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
            onGoogleApiLoaded={({ map, maps }) => this.InitMaps(map, maps)}
            center={{lat: 59.955413, lng: 30.337844}}
            defaultZoom={11} >
          </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;