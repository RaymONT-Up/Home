(() => {
  const COORDS_LS = "coords";
  const API_KEY = "f5dec47bc230cb2b3ed9d6c47374df82";

  const weatherWrapper = document.querySelector("#jsWeatherWrapper"),
    weatherTemp = weatherWrapper.querySelector("#jsWeatherTemp"),
    weatherPlace = weatherWrapper.querySelector("#jsWeatherPlace"),
    WeatherIcon = weatherWrapper.querySelector("#jsWeatherIcon");

  function getWeather(lat, lng) {
    // 1 этап запрос к серверу
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
      // 2 этап получаем ответ и конфертируем в JSON от сервера дожидаясь его и только потом выполням след шаг (ответ от сервера записываем в response)
      .then((response) => {
        return response.json();
      })
      // 3 этап полученный json ответ выводим в
      .then((json) => {
        const temperature = json.main.temp,
          place = json.name,
          weatherMainIcon = json.weather[0].icon;

        WeatherIcon.src = `http://openweathermap.org/img/wn/${weatherMainIcon}@2x.png`;
        weatherTemp.innerText = `${temperature}С`;
        weatherPlace.innerText = `${place}`;
      });
    // then позволяет выполнить следущую функцию/шаг только после того как у нас есть данные
  }

  // сохраняем в LS геоданые
  function saveCoords(positionObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj));
  }

  // если  успешно получили геолокацию
  function geoSuccesHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObject = {
      // когда название ключа совпадает с названием переменной можно убрать название ключа и сделать так:
      latitude,
      longitude,
    };
    saveCoords(positionObject);
    getWeather(latitude, longitude);
  }
  function askForCoords() {
    // получаем текущую гео позицию (если получилось успешно получить гео локацию, если не получилось получить геолокацию)
    navigator.geolocation.getCurrentPosition(geoSuccesHandler, geoErrorHandler);
  }

  function getCoords() {
    const coords = localStorage.getItem(COORDS_LS);
    if (coords === null) {
      askForCoords();
    } else {
      // функция получения погоды
      // передаем координаты
      const loadedCoords = JSON.parse(coords);
      getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
  }
  function geoErrorHandler() {
    alert("Allow geolocation for weather display and then reload the page");
  }
  function init() {
    getCoords();
  }
  init();
})();
