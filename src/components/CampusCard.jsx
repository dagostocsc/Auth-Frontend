import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./CampusStyle.css";

const CampusCard = ({ campus, API_URL, fetchAllCampuses }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/campuses/${campus.id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to delete ${campus.name}?`);
    if (!confirm) return;
    
  const token = localStorage.getItem("token"); 

  if(!token){
    alert("You have to be logged in to delete a campus!");
    return;
  }

    try {
      await axios.delete(`${API_URL}/api/campuses/${campus.id}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
    });
      fetchAllCampuses();
    } catch (e) {
      console.error("Error deleting campus", e);
    }
  };

  const handleEdit = () => {
    navigate(`/campuses/${campus.id}`, {
      state: { isEditing: true },
    });
  };

  return (
    <div className="campus-card">
      <img
        className="campus-card-image"
        src={campus.imageURL || "https://cdn-icons-png.flaticon.com/512/4696/4696591.png"}
        alt={`${campus.name} campus`}
        onClick={handleView}
        style={{ cursor: "pointer" }}
      />
      <div className="campus-card-text">
        <h3 onClick={handleView} style={{ cursor: "pointer" }}>
          {campus.name}
        </h3>
      </div>
      <div className="btns">
        <button className="btn-edit" onClick={handleEdit}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default CampusCard;
