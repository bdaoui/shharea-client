import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/context';
import Masonry from '@mui/lab/Masonry';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'; 
import Grid from '@mui/material/Grid';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { findByLabelText } from '@testing-library/react';

const Feed = () => {
const [checkHover, setcheckHover] = useState(false);
const [target, setTarget] = useState("");

const { images, setImages } = useContext(AuthContext);

useEffect(() => {
   axios
        .get('http://localhost:5005/home/images')
        .then((res) => setImages(res.data))
        .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const handleHover = (id) =>{
  setTarget(id)

  return setcheckHover (true);
}


  return (
    <div>
    {images && 

      <Masonry columns={{ xs:1, sm: 2, md:4 }} spacing={1} sx={{ px: 4 }}>
        {images.map((item, index) => (
          <div key={item._id} >
          
          <Link href={`/home/image/${item._id}`} underline="none" >
          <img
              src={`${item.imageUrl}?w=162&auto=format`}
              srcSet={`${item.imageUrl}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width:'100%'

              }}
              onMouseOver={() => handleHover(item._id)}
              onMouseOut={()=> setcheckHover(false)}

            />  


            
           {target === item._id && checkHover?
          <div style={{ 
            position: "relative", top: "-5vh", width: "100%" 
          
          }}>
          <Typography variant="caption" color="secondary" style={{ position: "absolute", backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'darken'}}>
                  {target === item._id && checkHover? item.tags : null}      
          </Typography>    
  
          </div>

          : null}





         </Link>

       

         {/* <Typography variant="h5" color="primary" style={{ position: "relative", top: "-8vh", right: "12vw", display: "fixed"}}> 
                  {
                    item.name 
                  }

                  <Typography variant="caption" color="secondary" sx={{}}>
                  {target === item._id && checkHover? item.tags : null}      
                  </Typography>  

          </Typography> */}

    

            <Grid container  >
              <Grid item xs={12}>
                <Typography variant="h8" color="primary" >
                  {item.name}
                </Typography>
              
              </Grid>

            </Grid>
            
            {/* <Typography variant="caption" gutterBottom>
              This image was posted by:   
            
              <Link to={`/profile/${item?.owner?._id}`} >
                {" " +item?.owner?.username}      
              </Link>
            </Typography> */}

          </div>
        ))}
      </Masonry>
}

    </div>
  )
}

export default Feed