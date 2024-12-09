import React from "react";
import TaskTable from "./components/TaskTable";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen">
      <TaskTable />
    </div>
  );
}

export default App;
