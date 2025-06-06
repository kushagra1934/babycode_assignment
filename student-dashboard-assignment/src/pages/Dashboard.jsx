// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../api";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    axios.get("/students").then((res) => setStudents(res.data));
  }, []);

  useEffect(() => {
    // Apply theme to the entire page
    document.body.className =
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  }, [theme]);

  const filtered = filter
    ? students.filter((s) =>
        s.course.toLowerCase().includes(filter.toLowerCase())
      )
    : students;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Student Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <Link
            to="/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Student
          </Link>
        </div>
      </div>
      <input
        type="text"
        placeholder="Filter by course"
        className={`border rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-400"
            : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
        }`}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className="space-y-6">
        {filtered.map((student) => (
          <li
            key={student.id}
            className={`shadow-xl rounded-lg p-4 transition duration-200 ${
              theme === "dark"
                ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                className="w-16 h-16 rounded-full"
                src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                alt={student.name}
              />
              <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-gray-500">{student.email}</p>
                <p className="text-gray-400 italic">{student.course}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Footer theme={theme} />
    </div>
  );
}
