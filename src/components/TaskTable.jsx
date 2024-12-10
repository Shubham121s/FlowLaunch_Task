import React, { useState, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTasks } from "../utils/api";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data || []);
      } catch (error) {
        toast.error("⚠️ Failed to fetch tasks. Please try again!");
      }
    };
    loadTasks();
  }, []);

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      description: "Enter task description here...",
      status: "To Do",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("🎉 Task added successfully!");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.error("🗑️ Task deleted successfully!");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.status.includes(filter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Task ID", field: "id", width: 80, editable: false },
    { title: "Title", field: "title", editor: "input" },
    { title: "Description", field: "description", editor: "input" },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: {
        values: ["To Do", "In Progress", "Done"],
      },
    },
    {
      title: "Actions",
      field: "actions",
      formatter: () =>
        '<button class="text-red-500 hover:underline">Delete</button>',
      cellClick: (e, cell) => deleteTask(cell.getRow().getData().id),
    },
  ];

  return (
    <div
      className={`min-h-screen p-6 transition-all ${isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-200"
          : "bg-gradient-to-br from-white to-gray-100 text-gray-900"
        }`}
    >
      <ToastContainer />

      {/* Header Section */}
      <header className="text-center py-6 shadow-lg rounded-lg bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg animate-pulse">
        Task List Manager 
        </h1>
      </header>


      {/* Controls */}
      <div className="flex justify-between items-center mt-10 px-6">
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transform transition-transform hover:shadow-xl"
          onClick={addTask}
        >
          + Add Task
        </button>

        <input
          type="text"
          placeholder="Search tasks..."
          className="rounded-lg px-4 py-2 border-2 border-gray-300 focus:ring-2 text-gray-900 focus:ring-blue-500 focus:outline-none shadow-md"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded-lg px-4 py-2 border-2 border-gray-300 focus:ring-2 text-gray-900 focus:ring-purple-500 focus:outline-none shadow-md"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button
          className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      {/* Task Table */}
      <div className="mt-8 rounded-lg shadow-lg bg-white p-4">
        <ReactTabulator
          data={filteredTasks}
          columns={columns}
          layout="fitDataFill"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default TaskTable;
