import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const TaskModal = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    description: "",
    dueDate: "",
    id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const tokenobj = localStorage.getItem("token");
  const token = JSON.parse(tokenobj);

  const addTasks = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/createTask",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("task created successfully");
      setFormData({
        title: "",
        priority: "",
        description: "",
        dueDate: "",
        id: "",
      });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 bg-gray-200/40 z-40 flex justify-center items-center">
      <div className="shadow-lg w-[700px] rounded-md p-6 z-50 bg-white relative">
        <h1 className="text-center text-xl font-semibold mb-4">Create Task</h1>
        <div className="absolute right-4 top-4 cursor-pointer" onClick={() => setOpen(false)} >
          <IoCloseSharp size={25}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="outline-none px-3 py-2 border border-gray-300 rounded-md focus:border-purple-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:border-purple-600"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="font-medium text-gray-700 block mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-purple-600 focus:outline-none"
            placeholder="Enter task description..."
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="mt-4">
            <label
              htmlFor="dueDate"
              className="font-medium text-gray-700 block mb-1"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-purple-600 focus:outline-none"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="dueDate"
              className="font-medium text-gray-700 block mb-1"
            >
              Assign To
            </label>
            <input
              id="toUser"
              name="id"
              type="text"
              placeholder="to user"
              value={formData.id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-purple-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={addTasks}
            className="px-5 py-2 bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-md text-white font-semibold cursor-pointer"
          >
            Add Task
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TaskModal;
