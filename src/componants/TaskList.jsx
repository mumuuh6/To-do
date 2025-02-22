import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDelete, onMoveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onMoveTask(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: isOver ? "2px solid green" : "2px solid #ccc",
        padding: "20px",
        margin: "10px",
        backgroundColor: "#f4f4f4",
        borderRadius: "4px",
      }}
    >
      <h3>Task List</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
