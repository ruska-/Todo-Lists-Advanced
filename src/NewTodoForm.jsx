import { useRef } from "react";

export function NewTodoForm({ addTodo }) {
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
      <input ref={newTodoRef} type="text" id="todo-input"></input>
      <button>Add Todo</button>
    </form>
  );
}