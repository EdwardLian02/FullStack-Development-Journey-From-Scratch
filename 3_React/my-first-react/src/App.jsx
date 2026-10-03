import { useState } from "react"



  const Card = ({title}) =>{

  const [hasLiked, setHasLiked] = useState(false);
  return (
    <div className="card">
      <h2> Movie Title: {title} </h2>
      <button onClick={() => setHasLiked(!hasLiked)}>{hasLiked? 'Liked ❤️' : 'Like 🤍'} </button>
    </div>
  )
}

const App = () => {
  return (
   <div className="card-container">
    <Card title="Star Wars" />
    <Card title="Avatar" />
   </div>
  )
}

export default App
