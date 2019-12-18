import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
      zoom: 11,
      node: {
          Details : {
            _latitude: 59.955413,
            _longitude: 30.337844  
          }
      }
    };
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div className="Map" >
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyC5BAQzS-gIlExFcm45_LCijKXxwwCzS94" }}
                center={{lat: this.props.node.Details._latitude, lng: this.props.node.Details._longitude}}
                defaultZoom={this.props.zoom} >
                <AnyReactComponent
                    lat={this.props.node.Details._latitude}
                    lng={this.props.node.Details._longitude}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
        );
    }
  }
   
  export default Map;