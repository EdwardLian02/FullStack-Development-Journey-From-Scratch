import { useEffect, useState } from "react"
import Card from "../components/Card"
import SignUpForm from "../components/SignUpForm"

const App = () => {
  return (
   <div className="card-container">
    <SignUpForm/>
    <Card title="Star Wars" />
    <Card title="Avatar" />



   </div>
  )
}

export default App
