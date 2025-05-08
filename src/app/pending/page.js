"use client"
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaListCheck } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { ImHappy } from "react-icons/im";
import Loader from "../../components/Loader"

const PendingPage = ({ currentUser, token }) => {
  const [tasks, setTasks] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTaskById = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/${currentUser.role}/tasks/${currentUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      setTasks(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  });

  const fetchAllTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/${currentUser.role}/getAllTasks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      setTasks(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  });

  useEffect(() => {
    if (currentUser?.role === "user") {
      fetchTaskById();
    } else {
      fetchAllTasks();
    }
  }, [currentUser]);

  useEffect(() => {
    if (tasks.length > 0) {
      const pendingTask = tasks.filter((t) => !t.completed);
      setPending(pendingTask);
    }
  }, [tasks]);

  return (
    <div className="w-[55%]  ml-56 mt-6">
      <div className="flex gap-2 items-center">
        <FaListCheck className="text-purple-900 font-semibold" />
        <h1 className="font-semibold text-xl">Pending tasks</h1>
      </div>

      {/* task card */}
      {!loading ? (
        <div className=" ">
          <div className="shadow-sm rouded-md p-5 mt-6 mb-10">
            <h1 className="text-xl font-semibold">All Tasks</h1>
          </div>
          <div className="flex flex-col gap-5 mt-4">
            {pending.length > 0 ? (
              pending.map((t) => (
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
              ))
            ) : (
              <div className="shadow-sm rounded-md flex justify-center items-center flex-col gap-3 p-10">
                <h1 className="text-purple-700 font-semibold text-2xl">
                  Hooray!
                </h1>
                <h4 className="text-gray-600 font-semibold text-xl mt-1">
                  No Pending Tasks
                </h4>
                <div className="mt-5 text-yellow-300/80 ">
                  <ImHappy size={80} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PendingPage;
