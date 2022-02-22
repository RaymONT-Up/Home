(() => {
  const todoForm = document.querySelector("#jsTodoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector("#jsTodoList");
  const TODOS_LS = "todos";
  let todos = [];

  function loadTodos() {
    const loaded_todos = localStorage.getItem(TODOS_LS);
    if (loaded_todos !== null) {
      const parsedTodos = JSON.parse(loaded_todos);
      // проходимся по каждому элементу массива
      parsedTodos.forEach((todo) => {
        // выводим название каждой отдельной задачи
        showTodos(todo.name);
      });
    }
  }

  function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
  }

  function deleteTodo(event) {
    const btn = event.target,
      li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter((todo) => {
      return todo.id !== parseInt(li.id);
    });
    todos = cleanTodos;
    saveTodos();
  }

  function doneTodo(event) {
    const btn = event.target,
      li = btn.parentNode;

    if (li.classList.contains("done")) {
      li.classList.remove("done");
    } else {
      li.classList.add("done");
    }
    saveTodos();
  }

  function showTodos(text) {
    const li = document.createElement("li"),
      delBtn = document.createElement("button"),
      doneBtn = document.createElement("button"),
      span = document.createElement("span");

    const newId = todos.length + 1;
    delBtn.textContent = "❌";
    delBtn.classList.add("del-btn");
    delBtn.addEventListener("click", deleteTodo);
    doneBtn.textContent = "✔️";
    doneBtn.classList.add("done-btn");
    doneBtn.addEventListener("click", doneTodo);

    span.innerHTML = text;
    li.classList.add("todo-list__item");
    li.appendChild(doneBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);

    const todoObject = {
      name: text,
      id: newId,
    };

    todos.push(todoObject);
    saveTodos();
  }

  function submitHandler(event) {
    event.preventDefault();

    // если todo input пустой то отправить форму не получится
    if (todoInput.value.length == 0) return;

    const currentValue = todoInput.value;
    showTodos(currentValue);
    todoInput.value = "";
  }

  function init() {
    loadTodos();
    todoForm.addEventListener("submit", submitHandler);
  }

  init();
})();
