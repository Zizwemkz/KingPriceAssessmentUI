import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialForm = {
  empNo: '',
  name: '',
  surname: '',
  phone: '',
  age: '',
  position: ''
};

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users from API
  useEffect(() => {
    setLoading(true);
    axios.get("https://localhost:44317/api/Employee")
      .then(res => setUsers(res.data))
      .catch(err => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingUser !== null) {
        // Update user
        const updatedUser = { ...form };
        await axios.put(`/api/users/${users[editingUser].id}`, updatedUser);
        const updated = [...users];
        updated[editingUser] = updatedUser;
        setUsers(updated);
        setEditingUser(null);
      } else {
        // Add user
        const res = await axios.post('/api/users', form);
        setUsers([...users, res.data]);
      }
      setForm(initialForm);
    } catch (err) {
      setError('Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditingUser(index);
    setForm(users[index]);
  };

  const handleDelete = async (index) => {
    setLoading(true);
    setError('');
    try {
      const userId = users[index].id;
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((_, i) => i !== index));
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="user-form">
        <input name="empNo" placeholder="Employee No" value={form.empNo} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required type="number" min="0" />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {editingUser !== null ? 'Update' : 'Add'} User
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      <ul>
        {users.map((user, index) => (
          <li key={user.id || index}>
            <div className="user-info">
              {user.empNo} - {user.name} {user.surname} | {user.phone} | {user.age} | {user.position}
            </div>
            <div className="user-actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;