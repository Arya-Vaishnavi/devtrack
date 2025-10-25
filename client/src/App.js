import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await addTask({
      title: newTask,
      description: "No description",
      status: "Pending",
      timeTaken: 0,
    });
    setNewTask("");
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    await updateTask(task._id, {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">DevTrack 🧩</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="border p-2 rounded w-72"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-lg space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2
                className={`font-semibold text-lg ${
                  task.status === "Completed" ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </h2>
              <p className="text-sm text-gray-500">{task.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleStatus(task)}
                className="px-3 py-1 text-sm rounded bg-green-500 text-white"
              >
                {task.status === "Completed" ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-3 py-1 text-sm rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;