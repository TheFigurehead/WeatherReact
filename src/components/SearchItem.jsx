import React from 'react';
import weatherToFormat from './../libs/weatherToFormat';

const SearchItem = (props) => {

    const content = [];

    if(!props.city){
        content.push(
            <span key="empty_search"></span>
        );
    }else if( props.city.cod === 404 ){
        content.push(
            <span key="no_city_found">No city found!</span>
        );
    }else{
        
        const city = weatherToFormat(props.city);

        content.push(
            <div key="2" className="weather_search_item" style={{backgroundColor: city.blockBackgroundColor}}>
                <h4 className="weather_search_item-title">Weather in {city.name},{city.country}</h4>

                <div className="weather_search_item-row">
                    <div className="weather_search_item-icon">
                        <img src={city.icon} alt={city.temp} />
                    </div>
                    <div className="weather_search_item-temp">
                        <img src={city.tempIcon} alt={city.temp}/> <b>{city.temp}℃</b>
                    </div>
                </div>
                <div className="weather_search_item-feels_like">
                    Feels like: <b>{city.feels_like}℃</b>
                </div>
            </div>
        );
    }

    return (
        <div>
            {content}
        </div>
    );

}

export default SearchItem;