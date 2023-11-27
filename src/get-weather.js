export {getWeather, weather}
import { showWeather } from "./show-weather";

function pick(obj, ...props) {
    return props.reduce(function(result, prop) {
        result[prop] = obj[prop];
        return result;
    }, {});
    }
    
    let weather;

    async function getWeather(city) {        
        let weatherForecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ed25e7b75ea847cabdb165554231711&lang=fr&days=3&q=${city}`, 
            {mode: 'cors'});
        
        const forecastData = await weatherForecast.json();
        let sortedCurrentData = pick(forecastData.current, 'condition', 'feelslike_c', 'humidity',
        'precip_mm', 'temp_c', 'wind_kph');
        let sortedLocData = pick(forecastData.location, 'country', 'name', 'region', 'localtime');
        let forecastArray = forecastData.forecast.forecastday;
        let sortedTomorrow = pick(forecastArray[1], 'date', 'day');
        let sortedAfterTomorrow = pick(forecastArray[2], 'date', 'day');
        weather = {
            current: sortedCurrentData,
            location: sortedLocData,
            tomorrow: sortedTomorrow,
            ['after-tomorrow']: sortedAfterTomorrow
        }
        showWeather('current');
        showWeather('tomorrow');
        showWeather('after-tomorrow');
    }
    