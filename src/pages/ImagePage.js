import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/review/comment";
import Like from "../components/review/like";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';


const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});

  const [like, setLike] = useState(false);
  const [comments, setComments] = useState(false);
  

  useEffect(() => {
    axios
      .get(`http://localhost:5005/home/image/${id}`)
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (

    // First Section

    <Grid container spacing={3}>

      <Grid item md={6} sx={{mt: 5}}>
        <Typography variant='h3' align="right">Name: {image.name} </Typography>
      </Grid>

      <Grid item md={6} sx={{mt: 5}}>
        <Typography variant='h3' align="left">Tags: {image.tags} </Typography>
      </Grid>

      <Grid item md={12} sx={{mb: 5}}>
        <span>This image was posted by: {image?.owner?.username}</span>
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


        <div onClick={() => setLike(!like)} style={{position:"relative", top:"-13%", left:"46%"}}>
          <FavoriteIcon  /> 
        </div>
 

        <div onClick={() => setComments(!comments)} style={{position:"relative", top:"-13%", left:"46%"}}> 
          <CommentIcon  /> 
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
    
    {/* Last Section */}

      <Grid item md={12}>
        {comments && <Comment id={id} /> }
        {like && <Like id={id} /> } 
      </Grid>
  
      {/* {image && (
        <Grid>
          <Grid item >
          <img
            src={image.imageUrl}
            alt={image.name}
            loading="lazy"
            style={{
              display: "block",
              width: "25%",
            }}
          />
          <h2>{image.name}</h2>
          <span>{image.tags}</span>
          <span>This image was posted by: {image?.owner?.username}</span>
          {image?.comments?.map((comment) => (
            <h3 key={comment?._id}>
              <span>{comment?.owner?.username} posted: </span>{" "}
              {comment?.comment}
            </h3>
          ))}

          {image?.likes?.map((like) => (
            <h3 key={like?._id}>{like?.username} liked this</h3>
          ))}

          <h1>This images has {image?.likes?.length} likes</h1>
        </Grid>
      )}

      <Comment id={id} />
      <Like id={id} /> */}

    </Grid>
  )
};

export default ImagePage;
