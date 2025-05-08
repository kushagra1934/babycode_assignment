// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("dark"); // Default to dark mode
  const nav = useNavigate();

  useEffect(() => {
    // Apply theme to the entire page
    document.body.className =
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  }, [theme]);

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`shadow-lg rounded-lg p-8 max-w-md w-full ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "border-gray-700 bg-gray-700 text-white focus:ring-blue-400"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "border-gray-700 bg-gray-700 text-white focus:ring-blue-400"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-3 rounded-lg w-full hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className={`hover:underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
