import axios from 'axios';
import React, {useState, useContext} from 'react'

import {AuthContext} from '../../context/context';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


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
            .post(`http://localhost:5005/home/image/comment`, {comment, imageId, owner})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

  return (
    <Grid container spacing={3}>
        <Grid item md={2}>
            <Typography variant='h5' align="center" >
                Comment:
            </Typography>
        </Grid>
        <Grid item md={4}>
            <form onSubmit={handleComment}>
                <div >
                    <label for="comment">
                        <textarea type="text" placeholder='Now that is magic' onChange={(e) => setComment(e.target.value)} value={comment} style={{margin: "0px", padding: "0px", width: "100%"}}/>
                    </label>
                </div>           
            </form>

        </Grid>
        <Grid item md={1}>
            <button type="submit">Comment!!!</button>
        </Grid>

    </Grid>
  )
}

export default Comment