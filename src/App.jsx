import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_ENDPOINT_URL;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/check-accounts`, { username, password });
      if (response.data.exit) {
        localStorage.setItem("username", username); // ✅ Store username in localStorage
        setShowError(false);
        navigate('/todo');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-300">
      <div className="w-[400px] bg-white p-6 rounded-2xl shadow-xl border-4 border-blue-400">
        {/* Title */}
        <h1 className="text-3xl text-center font-bold text-blue-700 mb-4"> Login </h1>
  
        {/* Error Message */}
        {showError && (
          <div className="bg-red-400 text-white p-2 text-sm text-center rounded-lg mb-3 shadow-md">
            Invalid username or password
          </div>
        )}
  
        {/* Username Input */}
        <div className="mb-3">
          <label htmlFor="username" className="text-blue-800 font-medium text-sm">Username</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-blue-400 rounded-lg bg-blue-50 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
  
        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="text-blue-800 font-medium text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 border-2 border-blue-400 rounded-lg bg-blue-50 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        {/* Login Button */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
        >
           LOGIN 
        </button>
      </div>
    </div>
  );
  
}

export default App;
