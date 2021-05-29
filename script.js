const api = {
    key: '5e507a0591e23208e8b022fcf819a1de',
    base: 'https://api.openweathermap.org/data/2.5/weather?q='
}


const searchBox = document.querySelector('.searchbox');
const main = document.querySelector('main');
const message = document.querySelector('.message')
searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getData(searchBox.value);
        main.classList.remove('hidden')
    }
})


function getData(value) {
    
    fetch(`${api.base}${value}&units=metric&APPID=${api.key}`)
        .then(weather => {
            if (weather.ok) {
                return weather.json()
            } else {
                main.classList.add('hidden')
                message.innerText = "couldn't find your city"
            }
            
        })
        .then (displayResults)
        
}


function displayResults(weather) {
    console.log(weather)
    const city = document.querySelector('.city')
    city.innerText = `${weather.name}, ${weather.sys.country}`
    console.log(weather.main.temp);

    const now = new Date();
    const date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    const temperature = document.querySelector('.temp')
    temperature.innerHTML = `${Math.round(weather.main.temp)}°<span>C</span>`

    const temperatureDesc = document.querySelector('.temp-desc')

    temperatureDesc.innerText = weather.weather[0].description
    
    const weatherIcon = document.querySelector('.weather-icon')
    weatherIcon.src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    console.log(weather.weather[0].icon)


    const highLow = document.querySelector('.hi-low')
    highLow.textContent = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`

}


function dateBuilder(time) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    const day = days[time.getDay()];
    const dayNumber = time.getDay();
    const month = months[time.getMonth()];
    const year = time.getFullYear();

    return `${day} ${dayNumber} ${month} ${year}`
}