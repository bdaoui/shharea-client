import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {AuthContext} from '../../context/context';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import useMediaQuery from '@mui/material/useMediaQuery';
import {theme} from '../../index'

const Feed = () => {

const { images, setImages } = useContext(AuthContext);


useEffect(() => {
   axios
        .get('http://localhost:5005/home/images')
        .then((res) => setImages(res.data))
        .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


const breakpoint = useMediaQuery(theme.breakpoints.down('sm' && 'md'));

  return (
    <div>

{images && 
       
  <ImageList sx={{ width: '98%', height: '100%', margin:'auto' }} variant="masonry" cols={breakpoint ? 1 : 4 } gap={2} >
    {images?.map((item) => (
    <ImageListItem key={item._id}>
      <img src={`${item.imageUrl}?w=500&fit=crop&auto=format`} srcSet={`${item.imageUrl}?w=500&fit=crop&auto=format&dpr=2 2x`} alt={item.name} loading="lazy" />
        <Link href={`/home/image/${item._id}`}>
        <ImageListItemBar title={item?.name} subtitle={`Posted by @${item?.owner?.username}`} actionIcon={
          <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.name}`}>
            
            <FavoriteIcon sx={{mr:1}} /> 
            <CommentIcon />
            
          </IconButton>}/></Link>
    </ImageListItem>))}
  </ImageList>
  }
    </div>
  )
}

export default Feed

// images.map((item) => {
        //   return (
        //   <div key={item._id}>
        //     <img
        //       src={item.imageUrl}
        //       alt={item.name}
        //       loading="lazy"
        //       style={{
        //         display: 'block',
        //         width: '25%',
        //       }}
        //     />
        //     <Link to={`/home/image/${item._id}`}>{item.name}</Link>
        //     <span>{item.tags}</span>
        //     <span>This image was posted by: 
            
        //       <Link to={`/profile/${item?.owner?._id}`}>
        //         {item?.owner?.username}
        //       </Link> 
        //     </span>
          
        //   {/* get profile by id */}
        //   </div>
        // )})}