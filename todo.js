// Initialize todo list from localStorage or empty
let todoList = JSON.parse(localStorage.getItem("todos")) || [];

const container = document.getElementById("todo-list");
const addBtn = document.querySelector(".btn-add");
const inputElement = document.getElementById("todo-input");
const dateElement = document.getElementById("todo-date");

// Display items on load
displayItems();

// Add new todo
addBtn.addEventListener("click", addToDo);

function addToDo() {
  const todoItem = inputElement.value.trim();
  const todoDate = dateElement.value;

  if (!todoItem || !todoDate) {
    alert("Todo and Date must be entered!");
    return;
  }

  todoList.push({ item: todoItem, dueDate: todoDate, done: false });
  saveAndDisplay();
  inputElement.value = "";
  dateElement.value = "";
}

// Save to localStorage and display
function saveAndDisplay() {
  localStorage.setItem("todos", JSON.stringify(todoList));
  displayItems();
}

// Display todos
function displayItems() {
  container.innerHTML = "";

  todoList.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";

    todoDiv.innerHTML = `
            <input type="checkbox" class="todo-check" ${todo.done ? "checked" : ""} data-index="${index}">
            <span class="todo-text ${todo.done ? "done" : ""}">${todo.item}</span>
            <span class="todo-date">${todo.dueDate}</span>
            <button class="btn-delete" data-index="${index}">Delete</button>
        `;

    container.appendChild(todoDiv);
    todoDiv.classList.add("fade-in");
  });
}

// Event delegation for delete and checkbox
container.addEventListener("click", (e) => {
  const index = e.target.getAttribute("data-index");

  if (e.target.classList.contains("btn-delete")) {
    todoList.splice(index, 1);
    saveAndDisplay();
  } else if (e.target.classList.contains("todo-check")) {
    todoList[index].done = e.target.checked;
    saveAndDisplay();
  }
});
