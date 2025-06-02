import React, { useState } from "react";
import axios from "axios";
import '../App.css'; // Ensure this has the shared styles
 
const API = "https://localhost:44317/api/EmployeeAllocation/employeesbydepartment/";
 
function SearchPage() {
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
 
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(API + encodeURIComponent(department));
    setEmployees(res.data);
  };
 
  return (
<div className="container">
<h2>Search Employees by Department</h2>
<form onSubmit={handleSearch}>
<input
          value={department}
          onChange={e => setDepartment(e.target.value)}
          placeholder="Department Name"
          required
        />
<button type="submit">Search</button>
</form>
 
      {employees.length > 0 && (
<div style={{ marginTop: "20px" }}>
<h3>Employees in {department} Department</h3>
<table>
<thead>
<tr>
<th>No</th>
<th>Name</th>
<th>Lastname</th>
<th>Position</th>
<th>Role</th>
<th>Department</th>
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
</tr>
              ))}
</tbody>
</table>
</div>
      )}
</div>
  );
}
 
export default SearchPage;