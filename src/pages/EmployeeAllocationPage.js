import React, { useEffect, useState } from "react";
import axios from "axios";

const ALLOC_API = "https://localhost:44317/api/EmployeeAllocation";
const EMPLOYEES_API = "https://localhost:44317/api/Employee";
const ROLES_API = "https://localhost:44317/api/Role";
const DEPTS_API = "https://localhost:44317/api/Department";

function EmployeeAllocationPage() {
  const [allocations, setAllocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ employeeId: "", roleId: "", departmentId: "", id: null });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [allocRes, empRes, roleRes, deptRes] = await Promise.all([
        axios.get(ALLOC_API),
        axios.get(EMPLOYEES_API),
        axios.get(ROLES_API),
        axios.get(DEPTS_API)
      ]);
      setAllocations(allocRes.data);
      setEmployees(empRes.data);
      setRoles(roleRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      setError("Failed to load data. Please check your API and network.");
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      if (editing) {
        await axios.put(`${ALLOC_API}/${form.id}`, form);
      } else {
        await axios.post(ALLOC_API, form);
      }
      setForm({ employeeId: "", roleId: "", departmentId: "", id: null });
      setEditing(false);
      fetchAll();
    } catch (err) {
      setError("Failed to save allocation.");
    }
  };

  const handleEdit = (alloc) => {
    setForm({
      employeeId: alloc.employeeId,
      roleId: alloc.roleId,
      departmentId: alloc.departmentId,
      id: alloc.id
    });
    setEditing(true);
  };

  const handleDelete = async id => {
    setError("");
    try {
      await axios.delete(`${ALLOC_API}/${id}`);
      fetchAll();
    } catch (err) {
      setError("Failed to delete allocation.");
    }
  };

  // Helper functions to get names from IDs
  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.employeeId === id || e.id === id);
    if (!emp) return id;
    // Use Name + Lastname (DTO) or fallback to name/surname
    return (emp.name || emp.Name || "") + " " + (emp.lastname || emp.Lastname || emp.surname || "");
  };

  const getRoleName = (id) => {
    const r = roles.find(role => role.id === id || role.roleId === id);
    return r ? (r.name || r.roleName) : id;
  };

  const getDeptName = (id) => {
    const d = departments.find(dept => dept.id === id || dept.departmentId === id);
    return d ? (d.name || d.departmentName) : id;
  };

  const resetForm = () => {
    setForm({ employeeId: "", roleId: "", departmentId: "", id: null });
    setEditing(false);
    setError("");
  };

  return (
    <div className="container">
      <h2>Employee Allocation</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <select name="employeeId" value={form.employeeId} onChange={handleChange} required 
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minWidth: "250px"
        }}>
          <option value="">Select Employee</option>
          {employees.map(emp =>
            <option key={emp.employeeId || emp.id} value={emp.employeeId || emp.id}>
              {(emp.name || emp.Name) + " " + (emp.lastname || emp.Lastname || emp.surname || "")}
            </option>
          )}
        </select>
        <select name="roleId" value={form.roleId} onChange={handleChange} required
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minWidth: "250px"
        }}>
          <option value="">Select Role</option>
          {roles.map(role =>
            <option key={role.id || role.roleId} value={role.id || role.roleId}>
              {role.name || role.roleName}
            </option>
          )}
        </select>
        <select name="departmentId" value={form.departmentId} onChange={handleChange} required
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minWidth: "250px"
        }}>
          <option value="">Select Department</option>
          {departments.map(dept =>
            <option key={dept.id || dept.departmentId} value={dept.id || dept.departmentId}>
              {dept.name || dept.departmentName}
            </option>
          )}
        </select>
        <button type="submit">{editing ? "Update" : "Allocate"} Employee</button>
        {editing &&
          <button type="button" onClick={resetForm} style={{ marginLeft: 8 }}>
            Cancel
          </button>}
      </form>
      {error && <div style={{ color: "red", margin: "8px 0" }}>{error}</div>}
      <table className="roles-table">
      <thead>
        <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Department</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {allocations.map(alloc => (
                <tr key={alloc.id}>
                <td>{getEmployeeName(alloc.employeeId)}</td>
                <td>{getRoleName(alloc.roleId)}</td>
                <td>{getDeptName(alloc.departmentId)}</td>
                <td>
                <div className="action-buttons">
                <button onClick={() => handleEdit(alloc)} style={{ marginLeft: 8 }}>Edit</button>
                <button onClick={() => handleDelete(alloc.id)} style={{ marginLeft: 4 }}>Delete</button>
                </div>
                </td>
                </tr>
              ))}
      </tbody>
      </table>
    </div>
  );
}

export default EmployeeAllocationPage;