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

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: "New Task",
      description: "Task Description",
      status: "To Do",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully!", { icon: "✅" });
  };

  const editTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
    toast.info("Task updated successfully!", { icon: "✏️" });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.error("Task deleted successfully!", { icon: "🗑️" });
  };

  const columns = [
    { title: "Task ID", field: "id", width: 80, editable: false },
    { title: "Title", field: "title", editor: "input" },
    { title: "Description", field: "description", editor: "input" },
    {
      title: "Status",
      field: "status",
      editor: "select",  // Correct editor for dropdown
      editorParams: {
        values: ["To Do", "In Progress", "Done"],  // Status options
      },
      cellEdited: (cell) => {
        const updatedTask = cell.getRow().getData();
        editTask(updatedTask.id, updatedTask);
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
    <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 min-h-screen">
      <ToastContainer />
      <header className="text-center py-4">
        <h1 className="text-5xl font-extrabold text-purple-600">
          Task List Manager
        </h1>
        <p className="mt-2 text-gray-600">
          Organize your tasks efficiently with style ✨
        </p>
      </header>
      <div className="flex justify-between items-center my-4">
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          onClick={addTask}
        >
          Add Task
        </button>
        <select
          className="border border-gray-300 rounded px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <ReactTabulator
        data={filter ? tasks.filter((task) => task.status === filter) : tasks}
        columns={columns}
        layout="fitData"
        className="rounded-lg shadow-lg"
      />
      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Built with 💜 by [Shubham]
        </p>
      </footer>
    </div>
  );
};

export default TaskTable;
