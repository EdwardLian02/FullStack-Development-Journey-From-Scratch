import { TodoCard } from './TodoCard'

// Pure list renderer. Shows an empty state when there's nothing.
export function TodoList({ todos = [], onRemove, currentTab, onMarkDone }) {


  function getTodosByTab(todos, tab) {
    switch (tab) {
      case 'active':
        return todos.filter((t) => !t.done)

      case 'done':
        return todos.filter((t) => t.done);

      case 'all':
      default:
        return todos;
    }
  }
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
      {
          getTodosByTab(todos, currentTab).map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            onMarkDone={onMarkDone}
          />
          ))
      }
    </ul>
  )
}
