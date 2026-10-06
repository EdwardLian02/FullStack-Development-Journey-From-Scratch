
export function TodoCard({ todo, onRemove, onMarkDone}) {
  return (

    <li className={todo.done ? 'todo-card is-done' : 'todo-card'}>
      <button className="check" type="button" aria-hidden="true" tabIndex={-1} onClick={() => { 
        onMarkDone(todo.id)
      }}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8.5l3.2 3.2L13 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className="todo-text">{todo.text}</span>

      <button className="delete" type="button" aria-hidden="true" tabIndex={-1} onClick={() => {
        onRemove(todo.id)
      }}>
        ×
      </button>
    </li>
  )
}
