(() => {
  const form = document.querySelector("#jsForm"),
    input = form.querySelector("input"),
    greetings = document.querySelector("#jsGreetings");
  const USER_LS = "currentUsername";

  function saveUsername(text) {
    localStorage.setItem(USER_LS, text);
  }

  function submitHandler(event) {
    // убирает дефолт перезагрузки при перезагрузке формы
    event.preventDefault();
    const inputValue = input.value;
    showGreeting(inputValue);
    saveUsername(inputValue);
  }

  function showGreeting(text) {
    greetings.innerText = `Welcome ${text}!`;
    // добавляется класс с display block
    greetings.classList.add("showing");
    // скрывает форму с именем т.к это функция производится когда имя есть,то форма с именем не нужна
    form.classList.remove("showing");
  }

  function askForUsername() {
    form.classList.add("showing");
    form.addEventListener("submit", submitHandler);
  }

  function loadUsername() {
    const currentUsername = localStorage.getItem(USER_LS);
    // если в localStorage есть то выводит
    if (currentUsername === null) {
      askForUsername();
    } else {
      // если currentUsername не равен null то есть имя в LS есть то выводится приветствие и в (выводится имя)
      showGreeting(currentUsername);
    }
  }

  function init() {
    loadUsername();
  }
  init();
})();
