import { useEffect, useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todosArr, setTodosArr] = useState([]);

  const createTodo = () => {
    if (newTodoName !== "") {
      const id = crypto.randomUUID();
      const newTodoItem = {
        todoName: newTodoName,
        checked: false,
        markTodo: () => markTodo(id),
        deleteTodo: () => deleteTodo(id),
        id: id,
      };

      setTodosArr((arr) => [...arr, newTodoItem]);
      setNewTodoName("");
    } else console.log("name is empty");
  };

  const markTodo = function (id) {
    setTodosArr((prevArr) => {
      return prevArr.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      });
    });
  };

  const deleteTodo = (id) => {
    setTodosArr((prevTodosArr) =>
      prevTodosArr.filter((todo) => todo.id !== id)
    );
  };

  return (
    <>
      <div>
        <ul>
          {todosArr.map((todoItem) => (
            <Todo
              key={todoItem.id}
              id={todoItem.id}
              checked={todoItem.checked}
              todoName={todoItem.todoName}
              markTodo={todoItem.markTodo}
              deleteTodo={todoItem.deleteTodo}
            ></Todo>
          ))}
        </ul>
      </div>
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          value={newTodoName}
          id="todo-input"
          onChange={(e) => {
            setNewTodoName(e.target.value);
          }}
        ></input>
        <button onClick={createTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
