// May have to visit the link below to request temporary access
// to the demo server before running ⬇
// https://cors-anywhere.herokuapp.com/corsdemo
window.addEventListener('load', () => {

    let lat;
    let lon;
    let location = document.getElementById("welcome-intro");
    let temperature = document.getElementById("temperature-value");

    const API_KEY = "115f112846ce8adce3ee3401f08b16c6";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            console.table(position);

            const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            console.table(lat, lon);

            const api = `${CORS_PROXY}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            fetch(api).
                then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data);
                    const { clouds, main, name: town , sys, weather, wind } = data;

                    // let town = name;
                    let country = sys.country;
                    let celsius = (main.temp - 273.15).toFixed(1);
                    let farenheit = ((main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
                    let icon = weather[0].icon;

                    if (country === "GB") {
                        country = "UK";
                    }


                    let townCountry = `${town}, ${country}`
                    location.innerHTML = `Today's weather in ${townCountry}`;

                    document.getElementById("temperature-icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    temperature.innerHTML = `${celsius}°C`;

                    console.log(data.clouds.all);
                    console.log(data.main.temp);
                    console.log(data.name);
                    console.log(data.sys.country);
                    console.log(data.weather[0].main);
                    console.log(data.wind.speed);
                })
        })
    }
})
    // if (temp.endsWith("0")) {
    //     temp = parseInt(temp);
    //     Math.round(temp);
    // }