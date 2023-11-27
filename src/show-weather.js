export {showWeather};
import { weather } from "./get-weather";

function showWeather(day) {
    let info = document.querySelector(`.${day}-info`);
    
        if (day=='current') {
            let header = document.querySelector(`.${day}-header`);
            console.log(weather);
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