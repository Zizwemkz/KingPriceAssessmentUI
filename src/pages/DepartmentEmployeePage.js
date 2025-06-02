import React, { useEffect, useState } from "react";

import EmployeeDeptList from "../components/EmployeeDeptList";

import axios from "axios";

import '../App.css';
 
const DEPTS_API = "https://localhost:44317/api/Department";
 
function DepartmentEmployeePage() {

  const [departments, setDepartments] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
 
  useEffect(() => {

    axios.get(DEPTS_API)

      .then(res => setDepartments(res.data))

      .catch(() => setDepartments([]));

  }, []);
 
  return (
<div className="container">
<h2>Search Employees by Department</h2>
<form>
    <select className="dropdown"
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minWidth: "250px"
              }}
    >
      <option value="">Select Department</option>
            {departments.map(dept =>
      <option key={dept.departmentId || dept.id} value={dept.departmentName || dept.name}>
                {dept.departmentName || dept.name}
      </option>
            )}
  </select>
</form>
 
      <div style={{ marginTop: "30px" }}>
<EmployeeDeptList departmentName={selectedDepartment} />
</div>
</div>

  );

}
 
export default DepartmentEmployeePage;

 