// Static input bar — no state, no submit handling. Just the look of it.
export function TodoInput() {
  return (
    <form className="todo-input" onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Add a task…" aria-label="Add a task" />
      <button type="submit">Add</button>
    </form>
  )
}
