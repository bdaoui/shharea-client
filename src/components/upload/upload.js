import axios from 'axios';
import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/context';


const Upload = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const userId=user?._id

    const handleUpload = (e) => {
    e.preventDefault();
    const tagsArray = [...tags].join('').split(',')
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.image.files[0]);
    uploadData.append("name", name);
    uploadData.append("owner", userId );
    uploadData.append("tags", JSON.stringify(tagsArray));
    
    axios
        .post('http://localhost:5005/home/upload', uploadData)
        .then((response) => console.log(response))
        .catch((err) => console.log("Error while uploading the file: ", err));
        navigate('/home')
    };


  return (
    <div>

      
        <form onSubmit={handleUpload}>

<div>
    <label for="name">
        NAME
    </label>
    <input type="name"
        placeholder='Name your upload' onChange={(e) => setName(e.target.value)} value={name}/>
</div>

<div >
    <label for="image" >
      SELECT YOUR IMAGE
    </label>
    <input type="file" name="image" />
</div>

<div >
    <label for="tags" >
        #TAGS
    </label>
    <textarea type="tags" 
        placeholder='Initiate a tag with #,
        Use commas to seperate tags' onChange={(e) => setTags(e.target.value)} value={tags}/>
</div>
<button type="submit">Upload Image!!!</button>
</form>

        </div>
   
  )
}

export default Upload