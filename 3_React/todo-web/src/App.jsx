import './App.css'
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'

// Static mock data — this is just here so the UI has something to show.
// No state, no handlers: everything below is presentational only.
const TODOS = [
  { id: 1, text: 'Buy oat milk', done: false },
  { id: 2, text: 'Finish the React tutorial', done: false },
  { id: 3, text: 'Ship the pull request', done: true },
  { id: 4, text: 'Water the plants', done: false },
  { id: 5, text: 'Call the dentist', done: true },
]

const counts = {
  all: TODOS.length,
  active: TODOS.filter((t) => !t.done).length,
  done: TODOS.filter((t) => t.done).length,
}

function App() {
  return (
    <div className="app">
      <Header total={counts.all} completed={counts.done} />
      <TodoInput />
      <Tabs active="all" counts={counts} />
      <TodoList todos={TODOS} />
    </div>
  )
}

export default App
