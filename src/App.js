import React from 'react';

import Weather from './components/Weather.jsx';

import './index.css';

class App extends React.Component{

  constructor(props){

    super(props);

    this.state = {
      coords: false
    }

  }

  componentDidMount(){
    this.getGeoPosition();
  }

  getGeoPosition(){

    this.getCoords().then(coords => {

      if(coords == false){

        var r = window.confirm("Please, allow to use your location.");
    
        if (r === true) {
          navigator.geolocation.getCurrentPosition((position) => {
              this.setState({
                coords: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
                }
              }); 
          }, function() {
              alert('deny');
          });
        } else {
          alert("You dont want it");
        }
      }else{
        this.setState({
          coords: {
            lat: coords.latitude,
            lon: coords.longitude
          }
        }); 
      }
    });

  }

  getCoords() {
    return new Promise((resolve, reject) =>
      navigator.permissions ?
  
        navigator.permissions.query({
          name: 'geolocation'
        }).then(permission =>
          permission.state === "granted" ? navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords)) 
            : resolve(false)
        ) :
  
      reject(new Error("Permission API is not supported"))
    )
  }

  render(){
    return (
      <div className="App">
        {this.state.coords !== false ? <Weather coords={this.state.coords}/> : <span>Please, share you geolocation.</span>}
      </div>
    );
  }
}

export default App;
