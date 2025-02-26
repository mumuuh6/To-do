import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = `http://localhost:5000/tasks?email=mumu15-4398@diu.edu.bd
`;
const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading,refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    },
    staleTime: 0, // Ensure fresh data
  });

  // Use effect to update tasks after fetching
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks); // Ensure taskList is updated once tasks are loaded
  }, [tasks]);

  // Handle drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return; // If dropped outside, ignore
  
    console.log("Drag result:", result);
  
    // Create a copy of the task list to avoid mutation
    const updatedTasks = [...taskList];
    console.log("Tasks before move:", updatedTasks);
  
    // Find the moved task by draggableId
    const movedTaskIndex = updatedTasks.findIndex(
      (task) => task._id === result.draggableId
    );
    const movedTask = updatedTasks[movedTaskIndex];
  
    console.log("Moved task:", movedTask);
  
    if (!movedTask) return;
  
    // Update the category of the moved task based on the droppableId
    movedTask.category = categories[result.destination.droppableId];
    console.log("Updated moved task category:", movedTask.category);
  
    // Remove the task from its old position
    updatedTasks.splice(movedTaskIndex, 1);
  
    // Insert the moved task into the new position
    updatedTasks.splice(result.destination.index, 0, movedTask);
  
    console.log("Tasks after move:", updatedTasks);
  
    // Set the state with the updated task list (ensuring no direct mutation)
    setTaskList(updatedTasks); // Ensure state is updated with a new array reference
  
    // Update the task in MongoDB
    try {
      await axios.patch(`http://localhost:5000/task/${movedTask._id}`, {
        category: movedTask.category,
      });
      console.log("Task updated successfully in MongoDB");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  
  
  
  
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {categories.map((category, index) => (
          <Droppable key={category} droppableId={index.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 bg-gray-100 p-4 rounded shadow-md min-h-[300px]"
              >
                <h2 className="text-lg font-semibold mb-2">{category}</h2>
                {taskList
                  .filter((task) => task.category === category)
                  .map((task, taskIndex) => (
                    <Draggable key={task._id} draggableId={task._id} index={taskIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 rounded shadow mb-2"
                        >
                          {task.title}
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
    </DragDropContext>
  );
};

export default TaskBoard;
