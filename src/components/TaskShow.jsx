import { useContext, useState } from "react";
import TaskCreate from "./TaskCreate";
import TasksContext from "../context/task";

function TaskShow({ task }) {
  const { editTaskById, deleteTaskById } = useContext(TasksContext);

  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteClick = () => {
    // onDelete(task.id);
    deleteTaskById(task.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, updatedTitle, updatedTaskDescription) => {
    setShowEdit(false);
    // onUpdate(id, updatedTitle, updatedTaskDescription);
    editTaskById(id, updatedTitle, updatedTaskDescription);
  };

  return (
    <div className="task-show-div">
      {showEdit ? ( // taskCreate
        <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div>
          <h3 className="task-show-title">Göreviniz</h3>
          <p>{task.title}</p>
          <h3 className="task-show-title">Yapılacaklar</h3>
          <p>{task.taskDescription}</p>
          <div className="task-show-buttons">
            <button
              className="task-show-buttons-delete"
              onClick={handleDeleteClick}
            >
              Sil
            </button>
            <button
              className="task-show-buttons-update"
              onClick={handleEditClick}
            >
              Güncelle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;
