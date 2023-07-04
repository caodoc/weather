const info = document.getElementById("info");
let ip = ""

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.ipify.org?format=json';

fetch(proxyUrl + apiUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the API response data
    console.log(data);
  })
  .catch(error => {
    console.error('An error occurred while making the request:', error);
  });


fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data =>
    {
        ip = data.ip;
        console.log(`Current IP address: ${ip}`);
    })
    .catch(error =>
    {
        console.error("An error occurred while fetching the IP address: ", error);
    });

fetch(`http://ip-api.com/json/${ip}`)
    .then(response => response.json())
    .then(data =>
    {
        const lat = data.lat;
        const lng = data.lon;
        const unit_temperature = "°C";
        const unit_windspeed = "km/h";
        console.log(`Latitude: ${lat}`);
        console.log(`Longitude: ${lng}`);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,windspeed_10m_max&current_weather=true&timezone=auto&forecast_days=1`)
            .then(response => response.json())
            .then(data =>
            {
                console.log(data);
                var daytime = data.current_weather.time.toString();
                daytime = daytime.slice(11, 13);
                if (daytime >= 0 && daytime <= 12)
                {
                    document.getElementById("header").innerHTML += "☀️";
                }
                else
                {
                    document.getElementById("header").innerHTML += "🌙";
                }
                document.getElementById("current_temperature").innerHTML += data.current_weather.temperature + unit_temperature;
                document.getElementById("current_windspeed").innerHTML += data.current_weather.windspeed + unit_windspeed;
                document.getElementById("daily_max_temperature").innerHTML += data.daily.temperature_2m_max + unit_temperature;
                document.getElementById("daily_min_temperature").innerHTML += data.daily.temperature_2m_min + unit_temperature;
                var time_sunrise = data.daily.sunrise.toString();
                document.getElementById("sunrise").innerHTML += time_sunrise.slice(11) + "a.m.";
                var time_sunset = data.daily.sunset.toString();
                document.getElementById("sunset").innerHTML += time_sunset.slice(11) + "p.m.";
                document.getElementById("max_windspeed").innerHTML += data.daily.windspeed_10m_max + unit_windspeed;
                document.getElementById("timezone").innerHTML += `${data.timezone} (UTC${data.timezone_abbreviation})`;
            })
            .catch(error =>
            {
                console.error(error);
                info.innerHTML = "An error occurred while fetching weather data.";
            });
    })
    .catch(error =>
    {
        console.error("An error occurred while fetching geolocation data: ", error);
    });