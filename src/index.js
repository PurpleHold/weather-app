        
function pick(obj, ...props) {
return props.reduce(function(result, prop) {
    result[prop] = obj[prop];
    return result;
}, {});
}

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('seach-city');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = new FormData(e.target);
    const formDataObj = Object.fromEntries(searchInput.entries());
    console.log(formDataObj['search-city']);
    console.log((formDataObj['search-city'])==false);
    if ((formDataObj['search-city'])==false) {
        return;
    }
    else {
        getWeather(formDataObj['search-city']);
    }
})


let weather;

async function getWeather(city) {
    
    let weatherForecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ed25e7b75ea847cabdb165554231711&lang=fr&days=3&q=${city}`, 
        {mode: 'cors'});
    
    const forecastData = await weatherForecast.json();
    sortedCurrentData = pick(forecastData.current, 'condition', 'feelslike_c', 'humidity',
    'precip_mm', 'temp_c', 'wind_kph');
    sortedLocData = pick(forecastData.location, 'country', 'name', 'region', 'localtime');
    forecastArray = forecastData.forecast.forecastday;
    sortedTomorrow = pick(forecastArray[1], 'date', 'day');
    sortedAfterTomorrow = pick(forecastArray[2], 'date', 'day');
    weather = {
        current: sortedCurrentData,
        location: sortedLocData,
        tomorrow: sortedTomorrow,
        ['after-tomorrow']: sortedAfterTomorrow
    }
    
    console.log(weather);
    showWeather('current');
    showWeather('tomorrow');
    showWeather('after-tomorrow');
}

getWeather('paris');


function showWeather(day) {
    let info = document.querySelector(`.${day}-info`);
    
        if (day=='current') {
            let header = document.querySelector(`.${day}-header`);
            let hourOnly = weather.location.localtime.slice(-5);
            let temp = document.querySelector(`.${day}-temp`);
            let conditions = document.querySelector(`.${day}-conditions`);

            header.innerHTML=`<div class="loc-name">${weather.location.name}</div>
            <div class="loc-info"><span class="country">${weather.location.country}</span>
            <span class="region">${weather.location.region}</span></div>
            <div class="local-hour">Heure locale: <span class="local-time">${hourOnly}</span></div>`;

            temp.innerHTML=`<div class="temp-nb">${weather.current.temp_c}<span class="celsius">°C</span></div>
            <div class="temp-line">Ressenti: <span class="felt-temp">${weather.current.feelslike_c}</span><span class="celsius">°C</span></div>`;

            info.innerHTML=`
            <div class="precip">Précipitations: ${weather.current.precip_mm}mm</div>
            <div class="humidity">Humidité: ${weather.current.humidity}%</div>
            <div class="wind">Vent: ${weather.current.wind_kph}km/h</div>`;

            conditions.innerHTML=`<div class="conditions"><img src="https:${weather.current.condition.icon}" alt="${weather.current.condition.text}">
            <span class="conditions-text">${weather.current.condition.text}</span></div>`
        };
        
        if (day!=='current') {
            info.innerHTML=`<div class="mean-temp">Température moyenne: ${weather[day].day.avgtemp_c}<span class="celsius">°C</span></div>
            <div class="conditions"><img src="https:${weather[day].day.condition.icon}" alt="${weather[day].day.condition.text}">
            <span class="conditions-text">${weather[day].day.condition.text}</span></div>
            <div class="wind">Vent: ${weather[day].day.maxwind_kph}km/h</div>`;
        }
}