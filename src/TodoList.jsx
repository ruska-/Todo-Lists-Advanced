import { Todo } from "./Todo";

export function TodoList({
  filteredArray,
  markCompleted,
  deleteTodo,
  editTodo,
}) {
  return (
    <ul>
      {filteredArray.map((todoItem) => (
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
