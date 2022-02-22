(() => {
  const clock = document.querySelector("#jsClock");
  const dayAndMonth = document.querySelector("#jsDayAndMonth");

  //
  function getTime() {
    // получаем информацию о времени и после выделяем создаем переменые под минуты и часы
    const date = new Date(),
      minutes = date.getMinutes(),
      hours = date.getHours(),
      seconds = date.getSeconds(),
      //
      dayIndex = date.getDay(),
      dayInTitles = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      monthIndex = date.getMonth(),
      monthInTitles = [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "June.",
        "July.",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec.",
      ];

    // выводим в html часы:минуты:секунды
    // также используя тернарный оператор мы делаем так чтобы если часов/минут/секунд меньше 10(1 число),то выписывается вместе с 0 что-то вроде 05:01:09
    clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    // выводим в html день и месяц с помощью масива и индекса дня/месяца.
    dayAndMonth.innerHTML = `${dayInTitles[dayIndex]} ${monthInTitles[monthIndex]}`;
  }

  function init() {
    getTime();
    // используя setInterval функция getTime вызывается каждую секунду тем самым таймер обновляется каждую секунду
    setInterval(getTime, 1000);
  }
  init();
})();
