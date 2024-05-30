import { useState } from 'react'
import './App.css'
import TaskCreate from './components/TaskCreate'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])

  const createTasks = (title, taskDescription) => {
    const createdTasks = [ 
      ...tasks,{
        id: Math.round(Math.random() * 999999),
        title: title,
        taskDescription: taskDescription
      }
    ]
    setTasks(createdTasks);
  }

  const deleteTaskById = (id) =>{
    // console.log(tasks.find(task => task.id === id))
    // console.log(id)
    const afterDeletingTasks = tasks.filter((tasks) => tasks.id !== id)
    setTasks(afterDeletingTasks)    
  }

  const editTaskById = (id, updatedTitle, updatedTaskDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: id,
          title: updatedTitle,
          taskDescription: updatedTaskDescription
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className='app-div'>
      <TaskCreate onCreate={createTasks} />
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById} />
    </div>
  )
}

export default App
