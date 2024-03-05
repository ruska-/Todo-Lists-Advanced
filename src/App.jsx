import { createContext, useEffect, useReducer } from "react";
import "./styles.css";
import { Todo } from "./Todo";

const LOCAL_STORAGE_KEY = "TODO_ITEMS";
const ACTIONS = {
  NEW_TODO_NAME: "NEW_TODO",
  RESET_TODO_NAME: "",
  MARK_TODO: "MARK_TODO",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
};

export const TodoContext = createContext();

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    { newTodoName: "", todosArr: [] },
    () => {
      let result = { newTodoName: "", todosArr: [] };
      const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedValue !== null) {
        result = { ...result, todosArr: JSON.parse(storedValue) };
      }

      return result;
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todosArr));
  }, [state.todosArr, LOCAL_STORAGE_KEY]);

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.NEW_TODO_NAME:
        return { ...state, newTodoName: payload };
      case ACTIONS.RESET_TODO_NAME:
        return { ...state, newTodoName: "" };
      case ACTIONS.MARK_TODO:
        return {
          ...state,
          todosArr: state.todosArr.map((todo) => {
            if (todo.id === payload.id) {
              return { ...todo, checked: !todo.checked };
            } else {
              return todo;
            }
          }),
        };
      case ACTIONS.DELETE_TODO:
        return {
          ...state,
          todosArr: state.todosArr.filter((todo) => todo.id !== payload.id),
        };
      case ACTIONS.ADD_TODO:
        if (state.newTodoName === "") return state;
        else {
          const newTodoItem = {
            todoName: state.newTodoName,
            checked: false,
            markTodo: () => markTodo(id),
            deleteTodo: () => deleteTodo(id),
            id: crypto.randomUUID(),
          };

          return {
            ...state,
            todosArr: [...state.todosArr, newTodoItem],
            todoName: "",
          };
        }
      default:
        return state;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO });
  }

  return (
    <>
      <div>
        <ul>
          {state.todosArr.map((todoItem) => (
            <Todo
              key={todoItem.id}
              id={todoItem.id}
              checked={todoItem.checked}
              todoName={todoItem.todoName}
              markTodo={() =>
                dispatch({
                  type: ACTIONS.MARK_TODO,
                  payload: { id: todoItem.id },
                })
              }
              deleteTodo={() =>
                dispatch({
                  type: ACTIONS.DELETE_TODO,
                  payload: { id: todoItem.id },
                })
              }
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
