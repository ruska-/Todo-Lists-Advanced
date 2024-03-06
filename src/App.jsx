import { useEffect, useReducer, useRef, useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";
import { NewTodoForm } from "./NewTodoForm";

const LOCAL_STORAGE_KEY = "TODO_ITEMS";
const LOCAL_STORAGE_HIDE = "TODO_HIDE_COMPLETED";
const ACTIONS = {
  NEW_TODO_NAME: "NEW_TODO",
  RESET_TODO_NAME: "",
  MARK_TODO: "MARK_TODO",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
};

function App() {
  const [todos, dispatch] = useReducer(reducer, { todosArr: [] }, () => {
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos.todosArr));
  }, [todos.todosArr, LOCAL_STORAGE_KEY]);

  function reducer(todos, { type, payload }) {
    switch (type) {
      case ACTIONS.MARK_TODO:
        return {
          ...todos,
          todosArr: todos.todosArr.map((todo) => {
            if (todo.id === payload.id) {
              return { ...todo, checked: !todo.checked };
            } else {
              return todo;
            }
          }),
        };
      case ACTIONS.DELETE_TODO:
        return {
          ...todos,
          todosArr: todos.todosArr.filter((todo) => todo.id !== payload.id),
        };
      case ACTIONS.ADD_TODO:
        return {
          ...todos,
          todosArr: [
            ...todos.todosArr,
            {
              todoName: payload.name,
              checked: false,
              id: crypto.randomUUID(),
            },
          ],
        };
      case ACTIONS.EDIT_TODO:
        return todos;
      default:
        return todos;
    }
  }

  function addTodo(name) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    setFilterValue("");
  }

  function filterArray() {
    let resultArr = todos.todosArr.filter((td) => {
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
              editTodo={() =>
                dispatch({
                  type: ACTIONS.EDIT_TODO,
                  payload: { id: todoItem.id },
                })
              }
            ></Todo>
          ))}
        </ul>
      </div>
      <NewTodoForm addTodo={addTodo}></NewTodoForm>
    </>
  );
}

export default App;
