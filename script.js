window.addEventListener("load", getLocation(run));

function run(lat, lon) {
    let urlForCurrent = `http://api.weatherapi.com/v1/current.json?key=5f26e4c8fdba4ea5ac0160958241009&q=${lat},${lon}&aqi=no`;
    fetch(urlForCurrent)
        .then(response => response.json())
        .then(data => {
            document.getElementById("currentLocation").innerHTML = data.location.name;
            document.getElementById("currentTemp").innerHTML = `${data.current.temp_c} °C`;
            document.getElementById("currentWeaIcon").src = `https:${data.current.condition.icon}`;
            document.getElementById("feelsLike").innerHTML = `${data.current.feelslike_c} °C`;
            document.getElementById("windSpeed").innerHTML = `${data.current.wind_kph} km/h`;
            document.getElementById("humidity").innerHTML = `${data.current.humidity} %`;
            document.getElementById("uvIndex").innerHTML = `${data.current.uv}`;

        })
        .catch(error => console.error('Error fetching the weather data:', error));
    
    let urlForForecast = `http://api.weatherapi.com/v1/forecast.json?key=5f26e4c8fdba4ea5ac0160958241009&q=${lat},${lon}&aqi=no`;
    fetch(urlForForecast)
        .then(response => response.json())
        .then(data => {
            document.getElementById("rainChance").innerHTML = `Chance of rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
            const forecastHours = data.forecast.forecastday[0].hour;
            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = "";

            forecastHours.forEach(hour => {
                const hourBlock = document.createElement("div");
                hourBlock.className = "forecast-hours";
                hourBlock.innerHTML = `
                    <p class="text-white">${hour.time.split(" ")[1]}</p>
                    <img src="https:${hour.condition.icon}" width="100px" height="100px" alt="wather-icon">
                    <p class="text-white">${hour.temp_c} °C</p>
                `;
                forecastContainer.appendChild(hourBlock);
            });
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {           
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(lat,lon);
            callback(lat, lon);
        }, (error) => {
            console.error("Error fetching location:", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}