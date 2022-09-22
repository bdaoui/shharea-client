import axios from 'axios';
import React, {useState, useContext} from 'react'

import {AuthContext} from '../../context/context';


const Comment = ({id}) => {
    const [comment, setComment] = useState("");
    const {user} = useContext(AuthContext);
    const imageId = id


    const handleComment = (e) => {
        e.preventDefault();
        const owner = user._id;
        // const uploadData = new FormData();
        // uploadData.append("comment", comment);
        // uploadData.append("owner", owner)
        // uploadData.append("id", imageId)
        axios
            .post(`https://mittens-buffalo.cyclic.app/home/image/comment`, {comment, imageId, owner})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

  return (
    <div>
        Comment:

        <form onSubmit={handleComment}>
            <div >
                <label for="comment">
                    Comment goes here: 
                </label>
                <textarea type="text" placeholder='Now that is magic' onChange={(e) => setComment(e.target.value)} value={comment}/>
            </div>           
            <button type="submit">Comment!!!</button>
        </form>


    </div>
  )
}

export default Comment