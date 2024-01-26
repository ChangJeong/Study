const API_KEY = 'd1ca333cb5f0cd8cad9a4f8e733ad22f';

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}5&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = document.querySelector('#weather span:first-child');
        const city = document.querySelector('#weather span:last-child');
       city.innerText = data.name;
        weather.innerText = `${data.weather[0].main}/${data.main.temp}°C`;

    });
}

function onGeoError() {
    alert("Can't get your location. Please try again later.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

