import { useEffect, useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTasks = async (title, taskDescription) => {
    const response = await axios.post("http://localhost:3000/tasks", {
      title: title,
      taskDescription: taskDescription,
    });
    console.log(response);
    const createdTasks = [
      ...tasks, response.data
    ];
    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    setTasks(response.data);
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const deleteTaskById = async (id) => {
    // console.log(tasks.find(task => task.id === id))
    // console.log(id)
    await axios.delete(`http://localhost:3000/tasks/${id}`);

    const afterDeletingTasks = tasks.filter((tasks) => tasks.id !== id);
    setTasks(afterDeletingTasks);
  };

  const editTaskById = async (id, updatedTitle, updatedTaskDescription) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      taskDescription: updatedTaskDescription
    });

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: id,
          title: updatedTitle,
          taskDescription: updatedTaskDescription,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="app-div">
      <TaskCreate onCreate={createTasks} />
      <h1>Görevler</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
