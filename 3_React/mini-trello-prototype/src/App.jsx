import { useRef, useState } from "react";
import StatusColumn from "./components/StatusColumn";
import AddNewTaskForm from "./components/AddNewTaskForm";

const DEMO_TASK = [
  {
    id: 1,
    title: "Learn React",
    description: "Practice useState and props",
    priority: "low",
    status: "todo",
  },
  {
    id: 2,
    title: "Build Todo App",
    description: "Create the board UI",
    priority: "medium",
    status: "doing",
  },
  {
    id: 3,
    title: "Learn JavaScript",
    description: "Finish array methods",
    priority: "high",
    status: "done",
  },
  {
    id: 4,
    title: "Build React project",
    description: "Kanban board with local storage",
    priority: "low",
    status: "todo",
  },
  {
    id: 5,
    title: "Practice array methods",
    description: "map, filter, reduce exercises",
    priority: "medium",
    status: "doing",
  },
  {
    id: 6,
    title: "React Router Basic",
    description: "Routes, links and navigation",
    priority: "high",
    status: "doing",
  },
];


function App() {
  console.log("I am rendering")
  const [tasks, setTasks] = useState(DEMO_TASK);
  const [isAddTask, setIsAddTask] = useState(false);
  const columnRefs = useRef({});

  function registerColumnRef(status, el) {
    console.log(status);
    console.log(el);
    columnRefs.current[status] = el;
  }

  function getTasksByStatus(status) {
    return tasks.filter((task) => task.status === status);
  }


  const todoTasks = getTasksByStatus('todo')
  const doingTasks = getTasksByStatus('doing');
  const doneTasks = getTasksByStatus('done');


  function addTask(newTask){
      if(!newTask) return;
      setTasks((preTasks) => [...preTasks, newTask]);
      setIsAddTask(false)
  }

  function deleteTask(delTask){
      const updateTasks = tasks.filter((task) => task.id !== delTask.id);
      setTasks((prev) => prev = updateTasks);
  }

  function changeStatus(task, newStatus){
      const updateTasks = tasks.map((t) => t.id === task.id? {...task, status: newStatus}: t);
      setTasks((prev) => prev = updateTasks);
  }

  return (
    <>
      <div className="board">
        <div className="board__head">
          <div className="head__top">
            <div>
              <div className="eyebrow">Personal board</div>
              <h1 className="title">Kanban Board</h1>
            </div>
            <button className="btn-primary" onClick={() => setIsAddTask((prev) => prev = !prev)}><span className="plus">+</span>Add Task</button>
          </div>

          <div className="toolbar">
            <div className="search">
              <span className="search__icon">⌕</span>
              <input type="text" placeholder="Search title or description…" />
            </div>
            <label className="filter">Priority
              <select>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>

        <div className="columns">

          <StatusColumn status='todo' tasks={todoTasks} onDelete={deleteTask} changeStatus={changeStatus} columnRefs={columnRefs} onColumnRef={registerColumnRef}/>
          <StatusColumn status='doing' tasks={doingTasks} onDelete={deleteTask} changeStatus={changeStatus} columnRefs={columnRefs} onColumnRef={registerColumnRef}/>
          <StatusColumn status='done' tasks={doneTasks} onDelete={deleteTask} changeStatus={changeStatus} columnRefs={columnRefs} onColumnRef={registerColumnRef}/>

        </div>
      </div>

      {
        isAddTask ?
          <AddNewTaskForm onSubmit={addTask} onCancel={()=>{setIsAddTask(false)}}/> :
          null
      } 



    </>





  )
}

export default App
