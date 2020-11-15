const todoInput = document.querySelector(".todo-input");
const todoInputBtn = document.querySelector(".todo-input-btn");
const todoList = document.querySelector(".list-ul");
const filterOption = document.querySelector(".filter");

document.addEventListener("DOMContentLoaded", getTodos);
todoInputBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);
function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  if (!todoInput.value) {
    alert("Put your Todo");
    return;
  }
  todoLi.innerHTML = todoInput.value;
  //save to local storage
  saveLocalTodos(todoInput.value);
  //~~
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.innerHTML = "<i class='fas fa-check'><i></i>";
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = "<i class='fas fa-trash'><i></i>";
  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(completeBtn);
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // todos.forEach(function (todo) {
  //   const todoDiv = document.createElement("div");
  //   todoDiv.classList.add("todo");

  //   const todoLi = document.createElement("li");
  //   todoLi.innerText = todo;
  //   todoLi.classList.add("todo-item");
  //   todoDiv.appendChild(todoLi);

  //   const completeBtn = document.createElement("button");
  //   completeBtn.classList.add("complete-btn");
  //   completeBtn.innerHTML = "<i class='fas fa-check'><i></i>";
  //   const trashBtn = document.createElement("button");
  //   trashBtn.classList.add("trash-btn");
  //   trashBtn.innerHTML = "<i class='fas fa-trash'><i></i>";
  //   todoDiv.appendChild(completeBtn);
  //   todoDiv.appendChild(trashBtn);

  //   todoList.appendChild(todoDiv);
  // });
  for (let todo of todos) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = "<i class='fas fa-check'><i></i>";
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = "<i class='fas fa-trash'><i></i>";
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
  }
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
