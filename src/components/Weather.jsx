import React from 'react';

import WeatherDetailed from './WeatherDetailed.jsx';
import Search from './Search.jsx';
import BackgroundColorSlider from './BackgroundColorSlider.jsx';

class Weather extends React.Component{

    constructor(props){
        super(props);

        this.props = props;
        this.state = {
            data: false
        }

    }

    componentDidMount(){
        this.makeWeatherRequest();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.coords !== this.props.coords){
            this.makeWeatherRequest();
        }
    }

    makeWeatherRequest(){

        if(this.props.coords){

            let url = new URL('https://api.openweathermap.org/data/2.5/weather');

            url.searchParams.append( 'lat', this.props.coords.lat );
            url.searchParams.append( 'lon', this.props.coords.lon );
            url.searchParams.append( 'units', 'metric' );
            url.searchParams.append( 'appid', 'a913900e0d98f5e2a59336d802de9594' );
            
            fetch(url)
            .then( response => response.json() )
            .then( data => { 
                this.setState(
                    {
                        data: data
                    }
                );
            });
        }

    }

    render(){
        return(
            <React.Fragment>
                <WeatherDetailed data={this.state.data} />
                <Search />
                <BackgroundColorSlider data={this.state.data} />
            </React.Fragment>
        );
    }

}

export default Weather;