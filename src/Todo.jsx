import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "./App";

export function Todo({ checked, todoName, id }) {
  const { markTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const editNameRef = useRef(null);

  function handleSaveClick() {
    setIsEditing(false);
    editTodo(id, editNameRef.current.value);
  }

  useEffect(() => {
    if (isEditing && editNameRef.current) {
      editNameRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <li className="list-item">
        {isEditing ? (
          <>
            <input
              type="text"
              ref={editNameRef}
              defaultValue={todoName}
            ></input>
            <button data-button-edit onClick={handleSaveClick}>
              Save
            </button>
          </>
        ) : (
          <label className="list-item-label">
            <input
              type="checkbox"
              onChange={() => markTodo(id)}
              checked={checked}
              data-list-item-checkbox
            />
            <span data-list-item-text>{todoName}</span>
          </label>
        )}
        <button data-button-edit onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button onClick={() => deleteTodo(id)} data-button-delete>
          Delete
        </button>
      </li>
    </>
  );
}
