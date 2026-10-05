import { TodoCard } from './TodoCard'

// Pure list renderer. Shows an empty state when there's nothing.
export function TodoList({ todos = [] }) {
  if (todos.length === 0) {
    return (
      <div className="todo-empty">
        <strong>All clear</strong>
        Add a task above to get started.
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
