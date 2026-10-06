import { TodoCard } from './TodoCard'

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


  if (getTodosByTab(todos, currentTab).length === 0) {
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
