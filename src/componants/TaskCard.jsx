import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../pages/Authprovider";

const TaskCard = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  // Fix: Make sure the handleSubmit is properly used
  const {user}=useContext(AuthContext)
  const onSubmitHandler = (data) => {
    const bookingtask={
        ...data,
        email:user.email,
        timestamp: new Date().toISOString(),
    } // Trigger the parent function with form data
    console.log(bookingtask);
    axios.post('https://to-do-backend-kohl.vercel.app/tasks',bookingtask)
    .then(res=>console.log('done'))
    .catch(err=>console.log(err))
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-80">
      <h2 className="text-xl font-semibold mb-2">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-3">
        {/* Title Field */}
        <div>
          <label className="block font-medium">Title *</label>
          <input
            {...register("title", { required: "Title is required", maxLength: 50 })}
            type="text"
            className="w-full border px-2 py-1 rounded"
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { maxLength: 200 })}
            className="w-full border px-2 py-1 rounded"
            placeholder="Enter task description (optional)"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">Max 200 characters</p>}
        </div>

        {/* Category Field */}
        <div>
          <label className="block font-medium">Category</label>
          <select {...register("category")} className="w-full border px-2 py-1 rounded">
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Hidden Timestamp Field */}
        <input type="hidden" {...register("timestamp")} value={watch("timestamp")} />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskCard;
