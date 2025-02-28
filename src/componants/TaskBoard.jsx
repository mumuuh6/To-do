import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../pages/Authprovider";
import { Link } from "react-router-dom";

const TaskBoard = () => {
  const { user } = useContext(AuthContext);
  console.log('lili',user?.email)
  const API_URL = `https://to-do-backend-kohl.vercel.app/tasks?email=${user?.email}`;
  const categories = ["To-Do", "In Progress", "Done"];

  
  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      
      return res.data;
    },
    staleTime: 0,
  })
  console.log(tasks)
 const [taskList, setTaskList] = useState(tasks);
  const [editingTask, setEditingTask] = useState(null);
  
  useEffect(() => {
    setTaskList(tasks);
    refetch()
  }, [tasks,user]);
  
  console.log(taskList)
  const isOverdue = (timestamp) => {
    const currentDate = new Date();
    const taskDate = new Date(timestamp);
    return taskDate < currentDate; // Check if the task date is before the current date
  };
  const onDragEnd = async (result) => {
    if (!result.destination) return; // Ignore if dropped outside
    console.log("Drag result:", result);
    const { source, destination, draggableId } = result;
    // Copy tasks to avoid mutation
    const updatedTasks = [...taskList];
    console.log("Tasks before move:", updatedTasks);

    // Find the moved task
    const movedTaskIndex = updatedTasks.findIndex((task) => task._id === draggableId);
    const movedTask = updatedTasks[movedTaskIndex];

    console.log("Moved task:", movedTask.category);

    if (!movedTask) return;

    // Remove the task from its old position
    updatedTasks.splice(movedTaskIndex, 1);

    // If category changes, update category
    const newCategory = categories[destination.droppableId];

    if (movedTask.category !== newCategory) {
      movedTask.category = newCategory;
      console.log("Updated moved task category:", movedTask.category);
    }

    // Insert the moved task at the new position
    updatedTasks.splice(destination.index, 0, movedTask);
    console.log("Tasks after move:", updatedTasks);
    //reorder
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      order: index, // Assign new order
    }));
  
    console.log("Tasks after move:", reorderedTasks);
    // Update state
    setTaskList(updatedTasks);
    
    // Update the task in MongoDB
    try {
      await axios.patch(`https://to-do-backend-kohl.vercel.app/task/${movedTask._id}`, {
        category: movedTask.category,
        order:destination.index,
      });
      console.log("Task updated successfully in MongoDB");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
    console.log(taskList)
    refetch()
  };
  console.log(taskList)
  const handleUpdateClick = (task) => {
    setEditingTask(task);
  };

  const handleSaveUpdate = async () => {
    if (!editingTask) return;
    try {
      await axios.patch(`https://to-do-backend-kohl.vercel.app/update/${editingTask._id}`, {
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        timestamp: new Date().toISOString(),
      });
      setEditingTask(null);
      refetch();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://to-do-backend-kohl.vercel.app/delete/${taskId}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };
  if(isLoading){
    return <p className="loading">Please wait</p>
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {categories.map((category, index) => (
          <Droppable key={category} droppableId={index.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded shadow-md min-h-[200px]"
              >
                <h2 className="text-lg font-semibold mb-2">{category}</h2>
                
                {taskList?.length==0 && <p className="text-red-400 font-bold text-2xl md:text-4xl">Please Add Task First</p>}
                
                {taskList
                  .filter((task) => task.category === category)
                  .map((task, taskIndex) => (
                    <Draggable key={task._id} draggableId={task._id} index={taskIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="min-h-[100px] bg-white p-2 rounded shadow mb-2 "
                        >
                          
                         {user && 
                         <div className="flex justify-between">
                          <div>
                            
                            <p className="text-lg font-bold">Task Name:<span className=" font-normal">{task.title}</span></p>
                            <p className="text-lg font-bold">Description:<span className="font-normal">{task.description}</span></p>
                            <p className="text-lg font-bold"
                              style={{
                                color:
                                  (task.category === "To-Do" || task.category === "In Progress") && isOverdue(task.timestamp)
                                    ? "red"
                                    : "inherit",
                              }}
                            >Date:
                             <span  className="font-normal"> {new Date(task.timestamp).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}</span>
                            </p>
                            <p className="text-lg font-bold">Category: <span  className="font-normal">{task.category}</span></p>
                          </div>
                          <div className="flex justify-between gap-2 flex-col">
                            <button className="btn btn-outline btn-primary" onClick={() => handleUpdateClick(task)}>Update</button>
                            <button className="btn btn-outline btn-primary" onClick={() => handleDelete(task._id)}>Delete</button>
                          </div>
                          </div>}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>

      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md flex justify-center items-center h-1/3">
            <div>
              <h2 className="text-center font-bold text-2xl">Edit Task</h2>
              <div className="flex justify-center items-center gap-2 mt-2">
                <p>Title:</p>
                <input
                  className=" border-black border-2 rounded-md"
                  type="text"
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <p>Description:</p>
                <input
                  className=" border-black border-2 rounded-md"
                  type="text"
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>
              <div className="flex justify-center items-center mt-2 ">
                <p>Category:</p>
                <select

                  value={editingTask.category}
                  onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className=" mt-2 flex justify-center items-center gap-2">
                <button className="btn btn-outline btn-primary" onClick={handleSaveUpdate}>Save</button>
                <button className="btn btn-outline btn-primary" onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DragDropContext>
  );
};

export default TaskBoard;