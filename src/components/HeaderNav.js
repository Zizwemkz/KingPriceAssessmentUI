import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

function HeaderNav() {
  const navigate = useNavigate();

  return (
    <header className="header-nav">
      <div className="header-container">
        <h1 className="header-title">KingPrice Assessment – Admin Portal</h1>
        <nav className="button-group">
          <button onClick={() => navigate("/EmployeeList")}>Manage Employees</button>
          <button onClick={() => navigate("/roles")}>Manage Roles</button>
          <button onClick={() => navigate("/departments")}>Manage Departments</button>
          <button onClick={() => navigate("/employee-allocation")}>Employee Allocation</button>
          <button onClick={() => navigate("/employees-by-department")}>Search Employees by Department</button>
        </nav>
      </div>
    </header>
  );
}

export default HeaderNav;