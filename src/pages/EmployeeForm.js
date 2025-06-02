import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeForm.css";

const API_URL = "https://localhost:44317/api/Employee";

function EmployeeForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    EmployeeNumber: "",
    Name: "",
    LastName: "",
    PhoneNumber: "",
    Age: 0,
    Position: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log(form); // See what you're sending!
      await axios.post(API_URL, {
        ...form,
        Age: Number(form.Age) // Ensure Age is a number
      });
      navigate("/");
    } catch (e) {
      setError("Failed to add employee.");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <input required name="EmployeeNumber" placeholder="Employee No" value={form.EmployeeNumber} onChange={handleChange} />
        <input required name="Name" placeholder="Name" value={form.Name} onChange={handleChange} />
        <input required name="LastName" placeholder="LastName" value={form.LastName} onChange={handleChange} />
        <input required name="PhoneNumber" placeholder="Phone Number" value={form.PhoneNumber} onChange={handleChange} />
        <input required type="number" name="Age" placeholder="Age" value={form.Age} onChange={handleChange} />
        <input required name="Position" placeholder="Position" value={form.Position} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default EmployeeForm;