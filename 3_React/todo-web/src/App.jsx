import './App.css'
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'
import { useState } from 'react'
import { useEffect } from 'react'

// Static mock data — this is just here so the UI has something to show.
// No state, no handlers: everything below is presentational only.
const TODOS = JSON.parse(localStorage.getItem('todos')) || [];

const COUNTS = {
  all: TODOS.length,
  active: TODOS.filter((t) => !t.done).length,
  done: TODOS.filter((t) => t.done).length,
}


function App() {
  const [todos, setTodos] = useState(TODOS);
  const [currentTab, setCurrentTab] = useState("all");
  const [counts, setCounts] = useState(COUNTS);

  useEffect(() => {
  setCounts({
      all: todos.length,
      active: todos.filter((t) => !t.done).length,
      done: todos.filter((t) => t.done).length,
    } )
    storeInLocal(todos);
  }, [todos]);

  function storeInLocal(todos){
    const jsonString = JSON.stringify(todos);
    localStorage.setItem('todos', jsonString);
    console.log('set to storage');
  }
  

  function addTodo(text){
      const newTodo = {
        id: Date.now(), 
        text: text, 
        done: false,
      }

      setTodos((prevTodos) => [...prevTodos, newTodo]);

  }

  function markDone(id){
    setTodos((prevTodos) => prevTodos.map((todo) =>
    {
      if(todo.id === id){
        return {...todo, done: !todo.done}
      } else {
        return todo;
      }
    }))
  }

  function removeTodo(id){
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  }

  return (
    <div className="app">
      <Header total={counts.all} completed={counts.done} />
      <TodoInput onAddTodo = {addTodo} />
      <Tabs active={currentTab} setCurrentTab={setCurrentTab} counts={counts} />
      <TodoList todos={todos} onRemove={removeTodo} onMarkDone = {markDone} currentTab={currentTab} />
    </div>
  )
}

export default App
