import { useState, useEffect } from "react";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = (e) => setTodo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") return;
    setTodos((currentArray) => [todo, ...currentArray]);
    setTodo("");
  };

  return (
    <div>
      <h1>My ToDos ({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChange}
          type="text"
          placeholder="Write Your To Do List..."
        />
        <button>Add To Do</button>
        <hr />
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default TodoList;
