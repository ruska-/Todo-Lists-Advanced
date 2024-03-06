import { useContext } from "react";
import { Todo } from "./Todo";
import { TodoContext } from "./App";

export function TodoList() {
  const { todos } = useContext(TodoContext);

  return (
    <ul>
      {todos.map((todoItem) => (
        <Todo key={todoItem.id} {...todoItem}></Todo>
      ))}
    </ul>
  );
}
