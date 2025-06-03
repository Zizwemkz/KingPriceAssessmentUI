import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://localhost:44317/api/Employee";

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [mode, setMode] = useState("view"); // "view" or "edit"
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch employee
  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        setEmployee(res.data);
        setEditForm(res.data); // Set edit form state for editing
      })
      .catch(() => setError("Failed to load employee."));
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Handle save/update
  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, editForm);
      setEmployee(editForm);
      setMode("view");
      setError("");
    } catch (e) {
      setError("Failed to update employee.");
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Employee Details</h2>
      {mode === "view" ? (
        <div>
          <strong>Employee No:</strong> {employee.employeeNumber}<br />
          <strong>Name:</strong> {employee.name}<br />
          <strong>Surname:</strong> {employee.lastname}<br />
          <strong>Age:</strong> {employee.age}<br />
          <strong>Position:</strong> {employee.position}<br />
          <button onClick={() => navigate("/EmployeeList")}>Back to List</button>
          <button onClick={() => setMode("edit")}>Edit</button>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div>
            <label>Employee No:</label>
            <input name="employeeNumber" value={editForm.employeeNumber} onChange={handleChange} required />
          </div>
          <div>
            <label>Name:</label>
            <input name="name" value={editForm.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Surname:</label>
            <input name="surname" value={editForm.lastname} onChange={handleChange} required />
          </div>
          <div>
            <label>Age:</label>
            <input name="age" type="number" value={editForm.age} onChange={handleChange} required />
          </div>
          <div>
            <label>Position:</label>
            <input name="position" value={editForm.position} onChange={handleChange} required />
          </div>
          <button type="submit">Save</button>
          <button type="button" className="btn cancel" onClick={() => setMode("view")}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default EmployeeDetails;