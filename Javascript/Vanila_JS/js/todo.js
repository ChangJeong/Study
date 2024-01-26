const todoForm = document.getElementById('todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let todos = [];

function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = todoInput.value;
    const newTodoObj = {
        text: newTodo,
        id : Date.now()
    };
    todoInput.value = "";
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    const button = document.createElement('button');
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodo.text;
    button.innerText = '❌';
    button.addEventListener('click', deletetodo);
    todoList.appendChild(li);
}

function deletetodo(e) {
    const li = e.target.parentElement;
    todos = todos.filter(item => item.id!== parseInt(li.id));
    saveTodos();
    li.remove();
}

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null) {    
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}
