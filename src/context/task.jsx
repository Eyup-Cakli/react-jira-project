import { createContext, useState } from "react";
import axios from "axios";

const TasksContext = createContext();

function Provider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTasks = async (title, taskDescription) => {
    const response = await axios.post("http://localhost:3000/tasks", {
      title: title,
      taskDescription: taskDescription,
    });
    console.log(response);
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    setTasks(response.data);
  };

  const deleteTaskById = async (id) => {
    // console.log(tasks.find(task => task.id === id))
    // console.log(id)
    await axios.delete(`http://localhost:3000/tasks/${id}`);

    const afterDeletingTasks = tasks.filter((tasks) => {
      return tasks.id !== id;
    });
    setTasks(afterDeletingTasks);
  };

  const editTaskById = async (id, updatedTitle, updatedTaskDescription) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      taskDescription: updatedTaskDescription,
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

  const sharedValuesAndMethods = {
    tasks,
    createTasks,
    fetchTasks,
    editTaskById,
    deleteTaskById,
  };

  return (
    <TasksContext.Provider value={sharedValuesAndMethods}>
      {children}
    </TasksContext.Provider>
  );
}

export { Provider };
export default TasksContext;
