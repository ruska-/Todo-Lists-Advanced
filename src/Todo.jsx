export function Todo({
  checked,
  todoName,
  id,
  markTodo,
  deleteTodo,
  editTodo,
}) {
  return (
    <>
      <li className="list-item">
        <label className="list-item-label">
          <input
            type="checkbox"
            onChange={() => markTodo(id)}
            checked={checked}
            data-list-item-checkbox
          />
          <span data-list-item-text>{todoName}</span>
        </label>
        <button data-button-edit onClick={() => editTodo(id)}>
          Edit
        </button>
        <button onClick={() => deleteTodo(id)} data-button-delete>
          Delete
        </button>
      </li>
    </>
  );
}
