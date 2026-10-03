import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


const Card = ({title, isCool, rating, actors}) =>{

  const isActorExist = actors != null;

  return (
    <div>
      <h2> Movie Title: {title} </h2>
      <p>{isCool? "VERY cool movie" : "NOT a very cool movie"} </p>

    {
      isActorExist?  <ul>
        {
          actors.map((element, index) => {
        return   <li key={index}> {element.name} | {element.age} </li>
          })
        }
      </ul> : <p>hi</p>
    }
    
    </div>
  )
}
const App = () => {
  return (
   <div>
     <h2>Functional Arrow Component</h2>
    <Card title="Star Wars" isCool={true} rating={5} actors={
      [
        {name: 'Kyaw kyaw', age: 21},
        {name: 'U aung', age: 10}
      ]
    } />
    <Card title="Avatar" isCool = {false} rating={5} />
   </div>
  )
}

export default App
