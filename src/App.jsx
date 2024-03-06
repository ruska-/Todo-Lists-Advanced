import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./styles.css";
import { Todo } from "./Todo";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

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

export const TodoContext = createContext();

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.MARK_TODO:
      return todos.map((todo) => {
        if (todo.id === payload.id) return { ...todo, checked: !todo.checked };
        else return todo;
      });

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== payload.id);

    case ACTIONS.ADD_TODO:
      return [
        ...todos,
        { todoName: payload.name, checked: false, id: crypto.randomUUID() },
      ];

    case ACTIONS.EDIT_TODO:
      return todos;

    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);

    return storedValue !== null ? JSON.parse(storedValue) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos, LOCAL_STORAGE_KEY]);

  const [filterValue, setFilterValue] = useState("");

  const [hideCompleted, setHideCompleted] = useState(() => {
    let storedValue = localStorage.getItem(LOCAL_STORAGE_HIDE);
    if (storedValue !== null && storedValue === "true") return true;
    else return false;
  });

  function addTodo(name) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
  }

  function markCompleted(id) {
    dispatch({ type: ACTIONS.MARK_TODO, payload: { id: id } });
  }

  function deleteTodo(id) {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: id } });
  }
  function editTodo(id) {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: id } });
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    setFilterValue("");
  }

  const filteredTodos = todos.filter((td) => {
    if (td.todoName.includes(filterValue)) {
      if (!hideCompleted || !td.checked) return td;
    }
  });

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addTodo,
        markTodo: markCompleted,
        deleteTodo,
        editTodo,
      }}
    >
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="filter-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={() => {
              localStorage.setItem(LOCAL_STORAGE_HIDE, !hideCompleted);
              setHideCompleted(!hideCompleted);
            }}
          />
          Hide Completed
        </label>
      </form>

      <TodoList></TodoList>

      <NewTodoForm></NewTodoForm>
    </TodoContext.Provider>
  );
}

export default App;
