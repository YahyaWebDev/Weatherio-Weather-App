const apikey = "764dbae0c4ac7b45c45acd154404bf83";

const weatherDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city-input");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityVal = cityInputElement.value;
    getWeatherData(cityVal);
});

async function getWeatherData(cityVal){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apikey}&units=metric`)

        if(!response.ok) {
            throw new Error("there is a problem please verfy!")
        }
        const data = await response.json();

        const icon = data.weather[0].icon
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `Wind speed: ${data.wind.speed}`,
        ]

        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Ico">`;

        weatherDataElement.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataElement.querySelector(".description").textContent = description;

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    }catch(error){
        weatherDataElement.querySelector(".icon").innerHTML = "";
        weatherDataElement.querySelector(".temperature").textContent = "";
        weatherDataElement.querySelector(".description").textContent = "an error happened please verify orthograph or try again later";
        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}