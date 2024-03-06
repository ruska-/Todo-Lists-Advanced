export function TodoFilterForm({
  setFilterValue,
  filterValue,
  hideCompleted,
  setHideCompleted,
  LOCAL_STORAGE_HIDE,
}) {
  function handleFilterSubmit(e) {
    e.preventDefault();
    setFilterValue("");
  }
  return (
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
  );
}
