import './App.css'
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'
import { useState, useEffect } from 'react'

function App() {
  //reads localStorage once, on first render only.
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem('todos')) || []
  );

  const [currentTab, setCurrentTab] = useState("all");


  //Setting up count everytime it renders
    const counts = {
      all: todos.length,
      active: todos.filter((t) => !t.done).length,
      done: todos.filter((t) => t.done).length,
    }

  //Store and sync in local storage
  useEffect(() => {
    storeInLocal(todos);
  }, [todos]);

  function storeInLocal(todos){
    const jsonString = JSON.stringify(todos);
    localStorage.setItem('todos', jsonString);
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
