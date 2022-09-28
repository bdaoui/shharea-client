import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/profile/profilecard";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../context/context";

//sx={{ color: (hoverImage[1] === item._id ? "#F06FCB" : "rgba(255, 255, 255, 0.54) ") }}
const ProfilePage = () => {
  const { id } = useParams();
  const [ownImages, setOwnImages] = useState([]);
  const { user } = useContext(AuthContext);

  const [hoverImage, setHoverImage] = useState([false, " "]);

  const storeToken = localStorage.getItem("authToken");
 
  useEffect(() => {
    axios
      .get(`http://localhost:5005/user/profile/${id}`, {
        headers: { Authorization: `Bearer ${storeToken}` },
      })
      .then((response) => setOwnImages(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = (id) => {
    axios 
      .delete(`http://localhost:5005/home/image/${id}`, 
      { headers: { Authorization: `Bearer ${storeToken}` },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

// const changeColor = () =>{
//   let color;
//   if(hoverImage[0] && hoverImage[1] ){
//     console.log( "I'm reading this red")
//     console.log(hoverImage)
//     return color = "red"
//   }
//   else{color ="black"}
//   console.log("i'm reading this black")
  
//   return color

// }


  return (
    <div>
      <ProfileCard id={id} />

      <Typography
        variant="h4"
        sx={{ padding: "20px", textDecoration: "underline" }}
        color="secondary"
      >
        View your images below
      </Typography>
      <ImageList variant="masonry" cols={4} xs={12}>
        {ownImages &&
          ownImages?.map((item) => (
            <div key={item._id}>
              <ImageListItem color="secondary">
                  {/* <Link href={`/home/image/${item._id}`}> */}
                <img
                  src={item?.imageUrl}
                  srcSet={item?.imageUrl}
                  alt={item.name}
                  loading="lazy"
                />
              
                  <ImageListItemBar
                    title={item?.name}
                    actionIcon={
                      // color is set by HoverImage state change
                      <IconButton
                        aria-label={`info about ${item.name}`}
                        onMouseOver={(e) => setHoverImage([!hoverImage[0], item._id])}
                        onMouseOut={(e) => setHoverImage([false, item._id])}
                        sx={{
                          color: (hoverImage[0] && hoverImage[1] === item._id? "#EE4B2B"  : "#F06FCB")
                            
                        }}
                        onClick={() => handleDelete(item._id)}
                      >
                        {user._id === id && (
                          <DeleteIcon  />
                        )}
                      </IconButton>
                    }
                  />{" "}
                
              </ImageListItem>
            </div>
          ))}
      </ImageList>

      {/* {
        ownImages && 
        ownImages?.map( item =>{
           return (
          <div key={item?._id}>
            <img
              src={item?.imageUrl}
              alt={item?.name}
              loading="lazy"
              style={{
                display: 'block',
                width: '25%',
              }}
            />
            <Link to={`/home/image/${item?._id}`}>{item?.name}</Link>
            
            <span>{item?.tags}</span>

            <div> 
              <h2>This Image Has {item?.comments?.length} comments</h2>
              {item?.comments?.map(comment => {
                return <p key={comment._id}><span>{comment?.owner?.username} said: </span> {comment.comment}</p>
              })}
            </div>
           
            <div> 
              <h2>This Image Has {item?.likes?.length} Likes</h2>
              {item?.likes?.map(like => {
                return <p key={like._id}><span>{like?.username} liked it </span></p>
              })}
            </div>


     </div>
        )})} */}
    </div>
  );
};

export default ProfilePage;
