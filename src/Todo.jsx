export function Todo({ checked, todoName, markTodo, deleteTodo, editTodo }) {
  return (
    <>
      <li className="list-item">
        <label className="list-item-label">
          <input
            type="checkbox"
            onChange={markTodo}
            checked={checked}
            data-list-item-checkbox
          />
          <span data-list-item-text>{todoName}</span>
        </label>
        <button data-button-edit onClick={editTodo}>
          Edit
        </button>
        <button onClick={deleteTodo} data-button-delete>
          Delete
        </button>
      </li>
    </>
  );
}
