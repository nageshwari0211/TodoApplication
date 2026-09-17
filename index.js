let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButtonEl = document.getElementById("saveTodoButton");
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function saveTodo() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
saveTodoButtonEl.onclick = saveTodo;

function createTodo(todo) {
    let todoItem = document.createElement("li");
    todoItem.classList.add("todo-item-container");
    todoItemsContainer.appendChild(todoItem);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isChecked;
    checkbox.classList.add("checkbox-input");
    todoItem.appendChild(checkbox);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    todoItem.appendChild(labelContainer);

    let label = document.createElement("label");
    label.textContent = todo.text;
    label.classList.add("checkbox-label");
    if (todo.isChecked) {
        label.classList.add("checked");
    }
    labelContainer.appendChild(label);
    checkbox.onclick = function () {
        todo.isChecked = !todo.isChecked;
        label.classList.toggle("checked");
    };
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("Delete");
    labelContainer.appendChild(deleteButton);

    // Delete task
    deleteButton.onclick = function () {
        labelContainer.remove();
        checkbox.remove();
    };
}
for (let todo of todoList) {
    createTodo(todo);
}
addTodoButton.onclick = function () {
    let userInput = document.getElementById("todoUserInput");
    let text = userInput.value.trim();
    if (text === "") {
        alert("Please enter a task");
        return;
    }
    let newTodo = {
        id: Date.now(),
        text: text,
        isChecked: false
    };

    todoList.push(newTodo);
    createTodo(newTodo);

    userInput.value = "";
};