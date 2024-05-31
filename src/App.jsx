import { useEffect, useContext } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import TasksContext from "./context/task";

function App() {
  // props yerine useContext yöntemi ile fetchTasks metoduna erişim sağlandı
  const {fetchTasks} = useContext(TasksContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  // app component TasksContext.Provider ile sarmalandığı için propstaki değerler providerdan sağlanıyor. 
  return (
    <div className="app-div">
      <TaskCreate /*onCreate={createTasks}*/ />
      <h1>Görevler</h1>
      <TaskList
        // tasks={tasks}
        // onDelete={deleteTaskById}
        // onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
