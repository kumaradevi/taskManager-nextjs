"use client"
import Card from '@/components/Card';
import Loader from '@/components/Loader';
import TaskModal from '@/components/TaskModal';
import React, { useState } from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FaFireFlameCurved } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const page = () => {
  const [open, setOpen] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModal,setEditModal] = useState(false);

  const low = allTasks?.filter((t) => t.priority === "low").length;
  const medium = allTasks?.filter((t) => t.priority === "medium").length;
  const high = allTasks?.filter((t) => t.priority === "high").length;

  return (
    <div className="w-[55%]  ml-56 mt-6">
      <h1 className="font-semibold text-xl">Dashboard</h1>
      <div className="flex justify-between">
        <h2 className="mt-3 font-semibold">Task Overview</h2>
        <button
          className="bg-gradient-to-br from-fuchsia-700 to-purple-600 text-white px-4 py-2 rounded-md font-semibold"
          onClick={() => setOpen(true)}
        >
          {" "}
          <span className="text-lg mr-2">+</span>Add New Task
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-7">
        <Card
          title="total tasks"
          count={allTasks.length}
          icon={<GrHomeRounded className="text-purple-700 font-medium" />}
        />
        <Card
          title="Low Priority"
          count={low}
          icon={<FaFireFlameCurved className="text-green-700 font-medium" />}
        />
        <Card
          title="Medium Priority"
          count={medium}
          icon={<FaFireFlameCurved className="text-yellow-400 font-medium" />}
        />
        <Card
          title="High Priority"
          count={high}
          icon={<FaFireFlameCurved className="text-red-500 font-medium" />}
        />
      </div>

      {/* all task */}
      {!loading ? (
        <div className=" ">
          <div className="shadow-sm rouded-md p-5 mt-6 mb-10">
            <h1 className="text-xl font-semibold">All Tasks</h1>
          </div>
          <div className="flex flex-col gap-5 mt-4">
            {allTasks.length > 0 &&
              allTasks.map((t) => (
                <div className="shadow-sm rounded-md p-5 border-l-4 border-purple-500">
                  <div key={t._id} className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {t.title}
                      </h3>
                      <p className="text-gray-600">{t.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-4">
                        <div
                          className={`${
                            t.completed ? "bg-green-400" : "bg-red-400"
                          } px-3 py-1 rounded-full shadow-sm text-white max-w-fit text-xs font-bold text-right`}
                        >
                          {t.completed ? "completed" : "pending"}
                        </div>
                        <span
                          className={`${
                            t.priority === "low"
                              ? "text-green-400"
                              : t.priority === "medium"
                              ? "text-yellow-300"
                              : "text-red-500"
                          } font-medium`}
                        >
                          {t.priority}
                        </span>
                        <div onClick={()=>handleEditModal(t.id)}>
                          <HiDotsVertical />
                          {editModal && (
                            <div className="absolute shadow-sm p-3 rounded-md bg-white z-50 w-[140px]">
                              <p className="flex gap-2 items-center" onClick={()=>handleEdit(t.id)}><FaEdit />Edit Task</p>
                              <p className="flex gap-2 items-center" onClick={()=>handleDelete(t.id)}><MdDelete />Delete Task</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p>Due:</p>
                        <div>
                          <GoClock className="text-purple-500" />
                        </div>
                        <p>
                          {new Date(t.dueDate).toLocaleString().split(" ")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}

      {/* modal */}
      {open && <TaskModal setOpen={setOpen} />}
    </div>
  );
}

export default page
