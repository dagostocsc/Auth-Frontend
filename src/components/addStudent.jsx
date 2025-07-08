import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./StudentStyles.css";

const AddStudent = ({ fetchAllStudents, API_URL }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageURL: "",
    gpa: "",
    campusId: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); 

    if (!token) {
      setError("You must be logged in to add a student.");
      return;
    }

    const { firstName, lastName, email } = formData;
    if (!firstName || !lastName || !email) {
      setError("First name, last name, and email are required.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/students`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAllStudents();
      navigate("/students");
    } catch (e) {
      console.error("Error adding student", e);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="add-student-form">
      <h1>Add a Student</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />

        <label>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label>GPA</label>
        <input
          type="number"
          step="0.01"
          value={formData.gpa}
          onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
        />

        <label>Campus ID</label>
        <input
          type="text"
          value={formData.campusId}
          onChange={(e) => setFormData({ ...formData, campusId: e.target.value })}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
        />

        {formData.imageURL && (
          <div style={{ margin: "1rem 0" }}>
            <img src={formData.imageURL} alt="Student preview" width="200" />
          </div>
        )}

        <button type="submit">➕ Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
