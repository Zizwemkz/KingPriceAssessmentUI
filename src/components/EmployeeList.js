import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://localhost:44317/api/Employee";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (e) {
      setError("Failed to load employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (e) {
      setError("Failed to delete employee.");
    }
  };

  return (
    <div className="container">
       <h2>All Amployees</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Employee No</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employeeNumber}</td>
              <td>{emp.name}</td>
              <td>{emp.lastname}</td>
              <td>{emp.age}</td>
              <td>{emp.position}</td>
              <td>
                <div className="action-buttons">
                <Link to={`/view/${emp.id}`}><button>View</button></Link>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <div>
    <button onClick={() => navigate("/add")}>Add Employee</button>
    </div>
    </div>
    
  );
}

export default EmployeeList;