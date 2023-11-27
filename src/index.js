import { getWeather, weather } from "./get-weather";
const searchForm = document.getElementById('search-form');

getWeather('paris');


function handleInputFlow() {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = new FormData(e.target);
        const formDataObj = Object.fromEntries(searchInput.entries());
        if ((formDataObj['search-city'])==false) {
            return;
        }
        else {
            getWeather(formDataObj['search-city']);
        }
    })
} 
handleInputFlow();