import Axios from "axios";
import React, { useState, useRef } from "react";

function CreateNewForm(params) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const CreatePhotoField = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", file);
    data.append("name", name);
    data.append("type", type);
    setName("");
    setType("");
    setFile("");
    CreatePhotoField.current.value = "";
    const newPhoto = await Axios.post("/create-recipe", data, { headers: { "Content-Type": "multipart/form-data" } });
    props.setRecipes(prev => prev.concat([newPhoto.data]));
  }

  return (
    <form className="p-3 bg-success bg-opacity-25 mb-5" onSubmit={submitHandler}>
      <div className="mb-2">
        <input ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" className="form-control" />
      </div>
      <div className="mb-2">
        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Recipe name" />
      </div>
      <div className="mb-2">
        <input onChange={e => setType(e.target.value)} value={type} type="text" className="form-control" placeholder="Type of food" />
      </div>
      <button className="btn btn-success">Create New Recipe!</button>
    </form>
  );
}

export default CreateNewForm;
