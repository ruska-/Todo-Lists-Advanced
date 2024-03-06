import { useContext } from "react";
import { Todo } from "./Todo";
import { TodoContext } from "./App";

export function TodoList() {
  const { todos, markCompleted, deleteTodo, editTodo } =
    useContext(TodoContext);

  return (
    <ul>
      {todos.map((todoItem) => (
        <Todo
          key={todoItem.id}
          {...todoItem}
          markTodo={markCompleted}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        ></Todo>
      ))}
    </ul>
  );
}
