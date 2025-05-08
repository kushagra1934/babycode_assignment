// src/pages/AddStudent.jsx
import { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.course) {
      return alert("All fields are required");
    }
    await axios.post("/students", form);
    nav("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Student
        </h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700 transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
