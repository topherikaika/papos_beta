import Axios from "axios";
import React, { useState } from "react";

function AnimalCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [file, setFile] = useState("");
  const [draftType, setDraftType] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setIsEditing(false);
    props.setRecipes(prev =>
      prev.map(function (recipe) {
        if (recipe._id == props.id) {
          return { ...recipe, name: draftName, type: draftType };
        }
        return recipe;
      })
    );
    const data = new FormData();
    if (file) {
      data.append("photo", file);
    }
    data.append("_id", props.id);
    data.append("name", draftName);
    data.append("type", draftType);
    const newPhoto = await Axios.post("/update-recipe", data, { headers: { "Content-Type": "multipart/form-data" } });
    if (newPhoto.data) {
      props.setRecipes(prev => {
        return prev.map(function (recipe) {
          if (recipe._id == props.id) {
            return { ...recipe, photo: newPhoto.data };
          }
          return recipe;
        });
      });
    }
  }
}

return (
  <div className="card">
    <div className="our-card-top">
      {isEditing && (
        <div className="our-custom-input">
          <div className="our-custom-input-interior">
            <input onChange={e => setFile(e.target.files[0])} className="form-control form-control-sm" type="file" />
          </div>
        </div>
      )}
    </div>
  </div>;
)
