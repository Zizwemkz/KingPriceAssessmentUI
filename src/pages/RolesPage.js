import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; // Make sure this contains the CSS I provided earlier
 
const API = "https://localhost:44317/api/Role";
 
    function RolesPage() {
      const [roles, setRoles] = useState([]);
      const [form, setForm] = useState({ roleName: "", id: null });
      const [editing, setEditing] = useState(false);
    
      useEffect(() => {
        fetchRoles();
      }, []);
    
      const fetchRoles = async () => {
        try {
          const res = await axios.get(API);
          setRoles(res.data);
        } catch (err) {
          console.error("Failed to fetch roles:", err);
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
              roleName: form.roleName,
            });
          } else {
            await axios.post(API, { roleName: form.roleName });
          }
          setForm({ roleName: "", id: null });
          setEditing(false);
          fetchRoles();
        } catch (err) {
          console.error("Failed to save role:", err);
        }
      };
    
      const handleEdit = (role) => {
        setForm({ roleName: role.roleName, id: role.id });
        setEditing(true);
      };
    
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
          try {
            await axios.delete(`${API}/${id}`);
            fetchRoles();
          } catch (err) {
            console.error("Failed to delete role:", err);
          }
        }
      };
    
      return (
    <div className="container">
    <h2>Roles</h2>
    
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          name="roleName"
          placeholder="Role Name"
          value={form.roleName}
          onChange={handleChange}
          required
          />
        <button type="submit" className="btn primary">
            {editing ? "Update" : "Add"} Role
        </button>
            {editing && (
        <button
            type="button"
            className="btn cancel"
            onClick={() => {
              setForm({ roleName: "", id: null });
              setEditing(false);
            }}>
                Cancel
        </button>
            )}
    </form>
    
        <table className="roles-table">
          <thead>
            <tr>
            <th>Role Name</th>
            <th>Actions</th>
            </tr>
          </thead>
              <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                <td>{role.roleName}</td>
                <td>
                <div className="action-buttons">
                <button className="btn view" onClick={() => handleEdit(role)}>
                                    Edit
                </button>
                <button className="btn delete" onClick={() => handleDelete(role.id)}>
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
    
    export default RolesPage;