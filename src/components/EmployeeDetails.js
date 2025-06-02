import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://localhost:44317/api/Employee";

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => setEmployee(res.data))
      .catch(() => setError("Failed to load employee."));
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee Details</h2>
      <div>
        <strong>Employee No:</strong> {employee.employeeNumber}<br />
        <strong>Name:</strong> {employee.name}<br />
        <strong>Surname:</strong> {employee.surname}<br />
        <strong>Phone Number:</strong> {employee.phoneNumber}<br />
        <strong>Age:</strong> {employee.age}<br />
        <strong>Position:</strong> {employee.position}<br />
      </div>
      <button onClick={() => navigate("/")}>Back to List</button>
      <button onClick={() => navigate(`/edit/${employee.id}`)}>Edit</button>
    </div>
  );
}

export default EmployeeDetails;