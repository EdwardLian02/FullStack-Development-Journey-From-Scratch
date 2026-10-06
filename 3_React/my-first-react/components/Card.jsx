import { useState, useEffect } from "react";

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

export default Card