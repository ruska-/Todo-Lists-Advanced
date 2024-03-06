import { useEffect, useReducer, useRef, useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";

const LOCAL_STORAGE_KEY = "TODO_ITEMS";
const LOCAL_STORAGE_HIDE = "TODO_HIDE_COMPLETED";
const ACTIONS = {
  NEW_TODO_NAME: "NEW_TODO",
  RESET_TODO_NAME: "",
  MARK_TODO: "MARK_TODO",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
};

function App() {
  const newTodoRef = useRef();
  const [state, dispatch] = useReducer(reducer, { todosArr: [] }, () => {
    let result = { todosArr: [] };
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue !== null) {
      result = { ...result, todosArr: JSON.parse(storedValue) };
    }

    return result;
  });

  const [filterValue, setFilterValue] = useState("");
  const [hideCompleted, setHideCompleted] = useState(() => {
    let storedValue = localStorage.getItem(LOCAL_STORAGE_HIDE);
    if (storedValue !== null && storedValue === "true") return true;
    else return false;
  });

  let todosArrayToShow = filterArray();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todosArr));
  }, [state.todosArr, LOCAL_STORAGE_KEY]);

  function reducer(state, { type, payload }) {
    switch (type) {
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
        if (newTodoRef.current.value === "") return state;
        else {
          const newTodoItem = {
            todoName: newTodoRef.current.value,
            checked: false,
            markTodo: () => markTodo(id),
            deleteTodo: () => deleteTodo(id),
            id: crypto.randomUUID(),
          };

          return {
            ...state,
            todosArr: [...state.todosArr, newTodoItem],
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

  function handleFilterSubmit(e) {
    e.preventDefault();
    setFilterValue("");
  }

  function filterArray() {
    let resultArr = state.todosArr.filter((td) => {
      if (td.todoName.includes(filterValue)) {
        if (!hideCompleted || !td.checked) {
          return td;
        }
      }
    });

    return resultArr;
  }

  return (
    <>
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="filter-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => {
              localStorage.setItem(LOCAL_STORAGE_HIDE, !hideCompleted);
              setHideCompleted(!hideCompleted);
            }}
          />
          Hide Completed
        </label>
      </form>
      <div>
        <ul>
          {todosArrayToShow.map((todoItem) => (
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
        <input ref={newTodoRef} type="text" id="todo-input"></input>
        <button>Add Todo</button>
      </form>
    </>
  );
}

export default App;
