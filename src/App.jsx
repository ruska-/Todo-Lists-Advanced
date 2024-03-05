import { useReducer, useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";
import { useLocalStorage } from "./useLocalStorage";

const LOCAL_STORAGE_KEY = "TODO_ITEMS";
const ACTIONS = {
  NEW_TODO_NAME: "NEW_TODO",
  RESET_TODO_NAME: "",
};

function App() {
  const [state, dispatch] = useReducer(reducer, { newTodoName: "" });
  const [todosArr, setTodosArr] = useLocalStorage(LOCAL_STORAGE_KEY, []);

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.NEW_TODO_NAME:
        return { ...state, newTodoName: payload };
      case ACTIONS.RESET_TODO_NAME:
        return { ...state, newTodoName: "" };
      default:
        return state;
    }
  }

  const createTodo = () => {
    if (state.newTodoName !== "") {
      const id = crypto.randomUUID();
      const newTodoItem = {
        todoName: state.newTodoName,
        checked: false,
        markTodo: () => markTodo(id),
        deleteTodo: () => deleteTodo(id),
        id: id,
      };

      setTodosArr((arr) => [...arr, newTodoItem]);
      dispatch({ type: ACTIONS.RESET_TODO_NAME });
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
          value={state.newTodoName}
          id="todo-input"
          onChange={(e) => {
            dispatch({ type: ACTIONS.NEW_TODO_NAME, payload: e.target.value });
          }}
        ></input>
        <button>Add Todo</button>
      </form>
    </>
  );
}

export default App;
