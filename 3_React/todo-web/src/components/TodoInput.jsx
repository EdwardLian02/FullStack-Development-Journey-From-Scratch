import { useState } from "react"

// Static input bar — no state, no submit handling. Just the look of it.
export function TodoInput({onAddTodo}) {

  const [text, setText] = useState("");

  function handleSubmit(e){
    e.preventDefault()

    if(!text.trim()){
   
      return ;
    }

    onAddTodo(text);
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input type="text" placeholder="Add a task…" aria-label="Add a task" onChange={(e) => setText(e.target.value)} value={text} />
      <button type="submit">Add</button>
    </form>
  )
}
