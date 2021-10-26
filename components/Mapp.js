import React, { Component } from 'react';

import Mapir from "mapir-react-component";

const Api_Code = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmN2UwM2I4M2QxNTczNTE1ZjUyNDc0OGMxNTFlMzliYWViZDBjOGMzMjg3YjAwNTZlYWEyZmQ2NGJlZGVhODQ1MGM4MTlkYTAxOTJkMzgyIn0.eyJhdWQiOiIxMTY2NCIsImp0aSI6IjlmN2UwM2I4M2QxNTczNTE1ZjUyNDc0OGMxNTFlMzliYWViZDBjOGMzMjg3YjAwNTZlYWEyZmQ2NGJlZGVhODQ1MGM4MTlkYTAxOTJkMzgyIiwiaWF0IjoxNjA2NjQyOTU4LCJuYmYiOjE2MDY2NDI5NTgsImV4cCI6MTYwOTE0ODU1OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.VSdlmcGeLgctdaKhNHycuQjk3AZoPovTnREv40kb5bQDBxRXSoXHhxNbQCLEAO6lLWE61Db2RMpT7KBK1gzsP0EWy4u6-19Ya9OJO39sGABrvEYmkIJ9k0MSdBvZCI8Uz9kLdmoU8Osfk31dMJY6Bo__KjK72kdzB7fuhMWskVvB_X7V_EgXu4ex_1rj79GtZc54qjw08trxHZ4MnCUu3-FUVhxHmeC9Qw85i1q-cvF8oFcU7WHD3AhrcnDt59DO-Qk9DXdxEENHIREdtw5KtzCkDlst8eK8tA-sNQ6d9VR06lIJH5IbXvYcDPb02oO8clAFiIDROBgUSUmrSso4cA";

const Maps = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        'x-api-key': Api_Code, //Mapir api key
        'Mapir-SDK': 'reactjs'
      },
    }
  }
});
let markerArray = new Array(), lat, lon;
class Mapp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markerArray: [],
      lat: 35.72,
      lon: 51.42



    }
    this.reverseFunction = this.reverseFunction.bind(this);





  }

  reverseFunction(map, e) {
    var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
    fetch(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Api_Code
        }
      })
      .then(response => response.json())
      .then(data => {

        this.setState({
          Address: data.address,
          lat: e.lngLat.lat,
          lng: e.lngLat.lng
        })
        this.props.callback({
          address: data.address,
          lat: e.lngLat.lat,
          lng: e.lngLat.lng
        });

      })
    const array = [];
    array.push(<Mapir.Marker
      coordinates={[e.lngLat.lng, e.lngLat.lat]}
      anchor="bottom">
    </Mapir.Marker>);
    markerArray = array;
    lat = e.lngLat.lat;
    lon = e.lngLat.lng;

  }
  render() {

    return (
      <div className="App">
        <Mapir
          center={[this.state.lon, this.state.lat]}
          onClick={this.reverseFunction}
          Map={Maps}
          userLocation

        >
          {this.state.markerArray}
        </Mapir>

      </div >

    )
  }
}

export default Mapp;
