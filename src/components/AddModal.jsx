import { useState } from "react";
import axios from "axios";

export default function AddModal({ hide, onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState(['']);
    const [message, setMessage] = useState('');
    const apiUrl = import.meta.env.VITE_ENDPOINT_URL;

    const addTask = () => {
        setTasks([...tasks, ""]);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        
    };

    const handleTaskChange = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
    };

    const handleSave = async () => {
        const loggedInUser = localStorage.getItem("username");
    
        if (!loggedInUser) {
            setMessage("❌ No logged-in user found!");
            return;
        }
    
        try {
            const response = await axios.post(`${apiUrl}/add-todo`, {
                username: loggedInUser,
                title: title,
                list_desc: tasks.filter((task) => task.trim() !== ""), // Remove empty tasks
            });
    
            if (response.data.success) {
                setMessage("✅ Successfully added!");
    
                // Notify parent and pass the new title ID to expand it automatically
                if (onTaskAdded) {
                    onTaskAdded(response.data.newTitleId); // Make sure backend returns newTitleId
                }
    
                setTimeout(() => {
                    hide(); // Close modal after success
                }, 1000);
            }
        } catch (error) {
            setMessage("❌ Error saving task!");
            console.error("Error saving task:", error);
        }
    };
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg">
          <div className="relative w-[360px] bg-white/80 p-6 rounded-2xl shadow-xl border-4 border-sky-400">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-sky-700 flex items-center gap-1">
                 Add Task
              </h3>
              <button
                onClick={hide}
                className="text-sky-500 hover:text-sky-700 text-2xl transition"
              >
                ✖
              </button>
            </div>
      
            {/* Message Notification */}
            {message && (
              <div
                className={`text-center text-sm font-semibold p-2 rounded-lg mb-3 transition ${
                  message.includes("✅") ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200"
                }`}
              >
                {message}
              </div>
            )}
      
            {/* Task Inputs */}
            <div className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-sky-700">Task Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="w-full mt-1 p-3 border border-sky-300 rounded-lg shadow-sm bg-white text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="Enter task title"
                />
              </div>
      
              {/* Task List */}
              <div>
                <label className="block text-sm font-medium text-sky-700">Task List</label>
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <div key={index} className="relative flex items-center">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => handleTaskChange(index, e.target.value)}
                        className="p-3 pr-10 border border-sky-300 rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-sky-500 outline-none"
                        placeholder={`Task ${index + 1}`}
                      />
                      {tasks.length > 1 && (
                        <button
                          onClick={() => removeTask(index)}
                          className="absolute right-3 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
      
              {/* Buttons */}
              <button
                onClick={addTask}
                className="mb-3 w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                 Add Task
              </button>
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition"
              >
                 Save
              </button>
            </div>
          </div>
        </div>
      );
      
}
