import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API = "https://localhost:44317/api/Department";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ departmentName: "", id: null });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(API);
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/${form.id}`, {
          id: form.id,
          departmentName: form.departmentName,
        });
      } else {
        await axios.post(API, { departmentName: form.departmentName });
      }
      setForm({ departmentName: "", id: null });
      setEditing(false);
      fetchDepartments();
    } catch (err) {
      console.error("Failed to save department:", err);
    }
  };

  const handleEdit = (dept) => {
    setForm({ departmentName: dept.departmentName, id: dept.id });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchDepartments();
      } catch (err) {
        console.error("Failed to delete department:", err);
      }
    }
  };

  return (
    <div className="container">
      <h2>Departments</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          name="departmentName"
          placeholder="Department Name"
          value={form.departmentName}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn primary">
          {editing ? "Update" : "Add"} Department
        </button>
        {editing && (
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              setForm({ departmentName: "", id: null });
              setEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="roles-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.departmentName}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn view"
                    onClick={() => handleEdit(dept)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(dept.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentPage;