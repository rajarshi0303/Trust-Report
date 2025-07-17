import { useState } from "react";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default
  const [secretKey, setSecretKey] = useState(""); // for admin registration
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role,
        secretKey,
      });
      console.log(res);
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 shadow bg-white dark:bg-gray-900 rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border dark:bg-gray-800 rounded"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        {role === "admin" && (
          <input
            type="text"
            placeholder="Admin Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full p-2 border dark:bg-gray-800 rounded"
          />
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
