import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./CampusStyle.css";


const AddCampus = ({ fetchAllCampuses, API_URL }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    imageURL: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token =localStorage.getItem("token");

    if (!token) {
      setError("Not logged in to add a campus.");
      return;
    }

    const { name, description, address } = formData;
    if (!name || !address || !description) {
      setError("Name, address, and description are required.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/campuses`, formData, {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllCampuses();
      navigate("/campuses");
    } catch (e) {
      console.error("Error adding campus", e);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="add-campus-form">
      <h1>Add a Campus</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <label>Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
        />

        {formData.imageURL && (
          <div style={{ margin: "1rem 0" }}>
            <img src={formData.imageURL} alt="Campus preview" width="200" />
          </div>
        )}

        <button type="submit">➕ Add Campus</button>
      </form>
    </div>
  );
};

export default AddCampus;
