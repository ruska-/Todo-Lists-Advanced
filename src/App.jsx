import { useReducer, useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";
import { useLocalStorage } from "./useLocalStorage";

const LOCAL_STORAGE_KEY = "TODO_ITEMS";

function App() {
  const [newTodoName, dispatch] = useReducer(reducer, "");

  //const [newTodoName, setNewTodoName] = useState("");
  const [todosArr, setTodosArr] = useLocalStorage(LOCAL_STORAGE_KEY, []);

  function reducer(state, { type, payload }) {
    switch (type) {
      case "NEW_NAME":
        return payload;
      case "RESET":
        return "";
    }
  }

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
      dispatch({ type: "RESET" });
    } else console.log("name is empty");
  };

  const markTodo = function (id) {
    console.log("aq", id);
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

  function handleSubmit(e) {
    e.preventDefault();
    createTodo();
  }

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
              markTodo={() => markTodo(todoItem.id)}
              deleteTodo={() => deleteTodo(todoItem.id)}
            ></Todo>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          value={newTodoName}
          id="todo-input"
          onChange={(e) => {
            dispatch({ type: "NEW_NAME", payload: e.target.value });
            //setNewTodoName(e.target.value);
          }}
        ></input>
        <button>Add Todo</button>
      </form>
    </>
  );
}

export default App;
