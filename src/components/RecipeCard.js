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
  }
}
