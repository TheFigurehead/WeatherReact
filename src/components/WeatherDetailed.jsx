import React from 'react';

import weatherToFormat from './../libs/weatherToFormat';

const WeatherDetailed = (props) => {

    if( !props.data ) return (<div>No data</div>);

    const format = weatherToFormat(props.data);

    return(
        <div className="weather_detailed" style={{backgroundColor: format.blockBackgroundColor}}>
            <h4 className="weather_detailed-title">Weather in {format.name},{format.country}</h4>
            <div className="weather_detailed-icon">
                <img src={format.icon} alt={format.temp} />
            </div>
            <div className="weather_detailed-temp">
                <img src={format.tempIcon} alt={format.temp}/> <b>{format.temp}℃</b>
            </div>
            <div className="weather_detailed-feels_like">
                Feels like: <b>{format.feels_like}℃</b>
            </div>
        </div>
    );
}

export default WeatherDetailed;