import blender from './../libs/blender';

import icons_day from './../icons/icons_day.json';
import icons_night from './../icons/icons_night.json';

const weatherToFormat = (data) =>{

    const daytime = isDay(data.dt, data.sys.sunrise, data.sys.sunset);
    const temp = data.main.temp;
    const feels_like = data.main.feels_like;
    const temp_range_pers = ((temp - (-30)) * 100) / (40 - (-30));
    const tempIcon = getTempIcon(temp_range_pers);
    const icon = getWeatherIcon(data.cod, daytime);

    return {
        temp: temp,
        feels_like: feels_like,
        tempIcon: tempIcon,
        icon: icon,
        blockBackgroundColor: getBackgroundColor(temp),
        name: data.name,
        country: data.sys.country
    }

}

const isDay = (time, sunrise, sunset) => {
    if( time < sunrise || time > sunset ){
        return false;
    }
    return true;
}

const getWeatherIcon = (cod, daytime) => {
        
    let path = '/icons/climacon-';
    
    if( daytime ){
        path += icons_day[cod];
    }else{
        path += icons_night[cod];
    }

    path += '.svg';

    return path;

}

const getTempIcon = (temp) => {

    const temps = [0, 25, 50, 75, 100];
    
    const closest = temps.reduce(function(prev, curr) {
        return (Math.abs(curr - temp) < Math.abs(prev - temp) ? curr : prev);
    });       

    return '/icons/climacon-thermometer' + closest + '.svg';

}

const getBackgroundColor = (temp) => {
        
    switch(true){
        case (temp <= -10): 
            return '#00ffff';
        case (temp === 10):
            return '#fff700';
        case (temp >= 30):
            return '#ff8c00';
        default:
            if(temp > -10 && temp < 10){
                const pers = ((temp - (-10)) * 100) / (10 - (-10));
                return blender('#00ffff', '#fff700', pers/100);
            }else{
                const pers = ((temp - (10)) * 100) / (30 - (10));
                return blender('#fff700', '#ff8c00', pers/100);
            }
    }

}

export default weatherToFormat;