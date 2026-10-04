import { useEffect, useState } from "react"



  const Card = ({title}) =>{

  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);


  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  },[hasLiked]);

  return ( 
    <div className="card" onClick={() => setCount((prevState) => prevState += 1)}>
      <h2> Movie Title: {title} </h2>
      <p className="view-text">{count} Views</p>
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
