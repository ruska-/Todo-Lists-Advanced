import { useContext, useRef } from "react";
import { TodoContext } from "./App";

export function NewTodoForm() {
  const { addTodo } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (newTodoRef.current.value === "") return;

    addTodo(newTodoRef.current.value);

    newTodoRef.current.value = "";
  }

  const newTodoRef = useRef();

  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input autoFocus ref={newTodoRef} type="text" id="todo-input"></input>
      <button>Add Todo</button>
    </form>
  );
}
