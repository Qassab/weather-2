const inputValue = document.querySelector(".search-bar");
const form = document.querySelector("#submit");
const weather = document.querySelector(".weather");
const searchIcon = document.querySelector(".fa-solid ");

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getLocation();

const weatherCal = async function () {
  const pos = await getLocation();
  console.log(pos);
  const { latitude: lat, longitude: lon } = pos.coords;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=02a70087b5928bc761bb5fcb427e25d9`
  );
  const data = await res.json();
  console.log(data);

  const date = new Date(pos.timestamp);
  const day = date.toDateString().slice(0, 4);
  const time = date.toTimeString().slice(0, 5);
  const icon = data.weather[0].icon;
  const { description } = data.weather[0];
  const { temp } = data.main;
  const tempC = temp - 273.15;
  const { country } = data.sys;
  const city = data.name;
  const high = data.main.temp_max;
  const highC = Math.ceil(high - 273.15);
  const low = data.main.temp_min;
  const lowC = Math.floor(low - 273.15);
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  console.log(humidity);

  let html = ` 

    <div class="country-name">
        <h2 class="city">${city}</h2>
        <h2 class="country"> ${country}</h2>
        <h2 class="time">${day} ${time}</h2>
        
        </div>
        <div class="weather-description">
        <div class="temp-icon">
        <img
        class="icon-img"
        src="http://openweathermap.org/img/wn/${icon}@2x.png"
        />
        <h4 class="temp">${Math.floor(
          tempC
        )} <span class="temp-i">°C</span></h4>
            <h3 class="des">${description}</h3>
          </div>
          <span>H:${highC}°</span><span class="low">L:${lowC}°</span>
        </div>
        <div class="weather-info">
            <span>Humidity: ${humidity}%</span>
            <span>Wind: ${Math.ceil(wind)} mph</span>
          </div>
    `;

  weather.insertAdjacentHTML("afterbegin", html);
};
weatherCal();

const searchCountry = async function (country) {
  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=9cdd7c1f0f6c47bfaf6103552221209&q=${country}`
  );
  // const res = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=02a70087b5928bc761bb5fcb427e25d9`
  // );
  const data = await res.json();
  console.log(data);

  const time = data.location.localtime.slice(-5);
  const countryName = data.location.country;
  const city = data.location.name;
  const temp = data.current.temp_c;
  const { icon } = data.current.condition;
  const description = data.current.condition.text;
  const { humidity } = data.current;
  const wind = data.current.wind_mph;

  console.log(wind);
  let html = ` 

    <div class="country-name">
        <h2 class="city">${city}</h2>
        <h2 class="country"> ${countryName}</h2>
        <h2 class="time"> ${time}</h2>
        
        </div>
        <div class="weather-description">
        <div class="temp-icon">
        <img
        class="icon-img"
        src="${icon}"
        />
        <h4 class="temp">${temp} <span class="temp-i">°C</span></h4>
        <h3 class="des">${description}</h3>
          </div>
         
        </div>
        <div class="weather-info">
            <span>Humidity: ${humidity}%</span>
            <span>Wind: ${wind} mph</span>
          </div>
    `;

  weather.insertAdjacentHTML("afterbegin", html);
};
//    searchCountry('syria')
//    searchCountry("london");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = inputValue.value;
  searchCountry(input);
  console.log("click");
  inputValue.value = "";
  //   worldWeather.innerHTML=''
  weather.innerHTML = "";
});
searchIcon.addEventListener("click", function (e) {
  e.preventDefault();
  let input = inputValue.value;
  searchCountry(input);
  console.log("click");
  inputValue.value = "";
  //   worldWeather.innerHTML=''
  weather.innerHTML = "";
});

// navigator.geolocation.getCurrentPosition(
// function(position){
//      const {latitude}=position.coords
//      const { longitude } = position.coords;
// const coords=[latitude,longitude]
//     const map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     L.marker(coords).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();
// }
// )
