import { useState } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [taskDescription, setTaskDescription] = useState(task ? task.taskDescription : '');

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeTask = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskFormUpdate) {
        onUpdate(task.id, title, taskDescription)
    } else {
        onCreate(title, taskDescription);
    }
    setTitle("");
    setTaskDescription("");
  };

  return (
    <div>
        {' '}
      {taskFormUpdate ? (
        <div className="task-update-div">
          <h3>Lütfen Task Ekleyiniz</h3>
          <form className="task-update-form">
            <label className="task-update-form-label">Başlığı Düzenleyiniz</label>
            <input
              value={title}
              onChange={handleChangeTitle}
              className="task-update-form-input"
            />
            <label className="task-update-form-label">Taskı Düzenleyiniz</label>
            <textarea
              value={taskDescription}
              onChange={handleChangeTask}
              className="task-update-form-textarea"
              rows={5}
            ></textarea>
            <button className="task-update-form-button" onClick={handleSubmit}>
              Düzenle
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create-div">
          <h3>Lütfen Task Ekleyiniz</h3>
          <form className="task-create-form">
            <label className="task-create-form-label">Başlık</label>
            <input
              value={title}
              onChange={handleChangeTitle}
              className="task-create-form-input"
            />
            <label className="task-create-form-label">Task giriniz</label>
            <textarea
              value={taskDescription}
              onChange={handleChangeTask}
              className="task-create-form-textarea"
              rows={5}
            ></textarea>
            <button className="task-create-form-button" onClick={handleSubmit}>
              Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;
