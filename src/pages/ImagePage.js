import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from '../context/context';

import Comment from "../components/review/comment";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import useMediaQuery from '@mui/material/useMediaQuery';
import {theme} from '../index'



const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [comments, setComments] = useState(false);
  const {user} = useContext(AuthContext);
  const userId = user?._id;
  const breakpoint = useMediaQuery(theme.breakpoints.down('sm' && 'md'));

  useEffect(() => {
    axios
      .get(`http://localhost:5005/home/image/${id}`)
      .then((res) => {
        setImage(res.data)
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = (e) => {
    e.preventDefault();  
    axios
        .post(`http://localhost:5005/home/image/like`, {userId, id})
        .then((res) => {
          setTimeout(window.location.reload(), 1000)
          console.log(res)})
        .catch((err) => console.log(err))
  }



  return (

    // First Section

    <Grid container spacing={3}>

      <Grid item md={12} sx={{mt: 5}}>
        <Typography variant='h3' align="center">{image.name} </Typography>
      </Grid>

      <Grid item md={12} sx={{mt: 1}}>
          <Typography variant='subtitle' align="center" color="secondary">{image?.tags?.join(" ")}</Typography>
      </Grid>

      <Grid item md={12} sx={{mb: 5}}>
        <Typography variant='subtitle' align="center">This image was posted by: {image?.owner?.username} </Typography>
      </Grid>

    {/* // Middle Section */}

      <Grid item md={6}>
        <img
          src={image.imageUrl}
          alt={image.name}
          loading="lazy"
          style={{
            width: "100%",
        }}
        />


        <div onClick={handleLike} style={{position:"relative", top:`${breakpoint ? '-25%' : '-15%'}`, display: "flex", alignItems: "center", justifyContent:"flex-end", margin:"10px", padding:"1px"}}>
          <FavoriteIcon  /> 
          {image?.likes?.length} 
        </div>
 

        <div onClick={() => setComments(!comments)} style={{position:"relative", top:`${breakpoint ? '-25%' : '-15%'}`, display: "flex", alignItems: "center", justifyContent:"flex-end", margin:"10px"}}> 
          <CommentIcon  /> 
          {image?.comments?.length} 
        </div>


      </Grid>


      <Grid item md={2}>
      {image?.likes?.map((like) => (
            <h3 key={like?._id}>{like?.username} liked this</h3>
          ))}
      </Grid>

      <Grid item md={4}>
        {image?.comments?.map((comment) => (
              <h3 key={comment?._id}>
                <span>{comment?.owner?.username} posted: </span>{" "}
                {comment?.comment}
              </h3>
              ))
        }
      </Grid>
    
      {comments && <Comment id={id} /> }

   
    </Grid>
  )
};

export default ImagePage;
