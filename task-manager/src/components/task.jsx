import React, { useEffect, useState } from "react";
import { API_URL } from "./utils.jsx";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  /* ===== FETCH TASKS ===== */
  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/api/task/gettask`);
    const data = await res.json();
    if (data.success) {
      setTasks(data.results);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ===== ADD / UPDATE ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Task name required");
      return;
    }

    if (editingId === null) {
      // ADD
      await fetch(`${API_URL}/api/task/addtask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input }),
      });
    } else {
      // UPDATE
      await fetch(`${API_URL}/api/task/taskupdate/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input }),
      });
      setEditingId(null);
    }

    setInput("");
    fetchTasks();
  };

  /* ===== DELETE ===== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await fetch(`${API_URL}/api/task/taskdelete/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  /* ===== FILTER LOGIC (FIXED) ===== */
  const visibleTasks =
    editingId === null
      ? tasks.filter((task) =>
          task.name.toLowerCase().includes(input.toLowerCase()),
        )
      : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Task Manager
      </h1>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={editingId ? "Update task" : "Add / search task"}
          className="
          w-72 px-4 py-2 rounded-xl border border-gray-300
          shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400
          transition-all duration-200
        "
        />

        <button
          className="
          bg-amber-500 text-white px-6 py-2 rounded-xl
          shadow-md cursor-pointer
          hover:bg-amber-600 hover:scale-105
          transition-all duration-200
        "
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Task Cards */}
      <ul className="max-w-2xl mx-auto space-y-4">
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            className="
            bg-white rounded-2xl p-5
            shadow-md flex justify-between items-center
            hover:shadow-xl hover:scale-[1.02]
            transition-all duration-200
          "
          >
            {/* Task Info */}
            <div>
              <p className="text-xs text-gray-400 mb-1">ID: {task.id}</p>
              <p className="text-lg font-medium text-gray-800">{task.name}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setInput(task.name);
                  setEditingId(task.id);
                }}
                className="
                bg-blue-500 text-white px-4 py-1.5 rounded-xl
                shadow-sm cursor-pointer
                hover:bg-blue-600 hover:scale-105
                transition-all duration-200
              "
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                className="
                bg-red-500 text-white px-4 py-1.5 rounded-xl
                shadow-sm cursor-pointer
                hover:bg-red-600 hover:scale-105
                transition-all duration-200
              "
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
