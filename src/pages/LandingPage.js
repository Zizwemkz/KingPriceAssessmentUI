import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>KingPrice Assessment – Admin Portal</h1>
      <div className="button-group">
        <button onClick={() => navigate("/EmployeeList")}>Manage Employees</button>
        <button onClick={() => navigate("/roles")}>Manage Roles</button>
        <button onClick={() => navigate("/departments")}>Manage Departments</button>
        <button onClick={() => navigate("/employee-allocation")}>Employee Allocation</button>
        <button onClick={() => navigate("/employees-by-department")}>Search Employees by Department</button>
      </div>
    </div>
  );
}

export default LandingPage;
