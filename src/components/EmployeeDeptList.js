import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import '../App.css';
 
const DEPT_API = "https://localhost:44317/api/EmployeeAllocation/employeesbydepartment/";

const EMPLOYEE_API = "https://localhost:44317/api/Employee"; // for delete
 
function EmployeeDeptList({ departmentName }) {

  const [employees, setEmployees] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();
 
  const fetchEmployees = () => {

    if (departmentName) {

      axios.get(`${DEPT_API}${encodeURIComponent(departmentName)}`)

        .then(res => setEmployees(res.data))

        .catch(() => setError("Failed to load employees."));

    }

  };
 
  useEffect(() => {

    fetchEmployees();

  }, [departmentName]);
 
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {

      await axios.delete(`${EMPLOYEE_API}/${id}`);

      fetchEmployees(); // refresh list

    } catch (err) {

      setError("Failed to delete employee.");

    }

  };
 
  if (!departmentName) return <div>Please select a department.</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;
 
  return (
<div>
<h3>Employees in {departmentName} Department</h3>
<table>
<thead>
<tr>
<th>No</th>
<th>Name</th>
<th>Lastname</th>
<th>Position</th>
<th>Role</th>
<th>Department</th>
<th>Actions</th>
</tr>
</thead>
<tbody>

          {employees.map(emp => (
<tr key={emp.employeeId}>
<td>{emp.employeeNumber}</td>
<td>{emp.name}</td>
<td>{emp.lastname}</td>
<td>{emp.position}</td>
<td>{emp.roleName}</td>
<td>{emp.departmentName}</td>
<td>
<div className="action-buttons">
<button onClick={() => navigate(`/edit/${emp.employeeId}`)}>Edit</button>
<button onClick={() => handleDelete(emp.employeeId)}>Delete</button>
</div>
</td>
</tr>

          ))}
</tbody>
</table>
</div>

  );

}
 
export default EmployeeDeptList;

 