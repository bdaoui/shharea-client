import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageviewIcon from '@mui/icons-material/Pageview';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';


const Explore = () => {
  const storeToken = localStorage.getItem('authToken');

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const one = "http://localhost:5005/home/search/upload";
  const two = "http://localhost:5005/home/search/user";
  const requestOne = axios.get(one, {headers: {Authorization: `Bearer ${storeToken}`}});
  const requestTwo = axios.get(two, {headers: {Authorization: `Bearer ${storeToken}`}});
 
  useEffect(() => {
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          setData([responses[0].data, responses[1].data]);
        })
      )
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyData = [...data];
  const images = copyData[0];
  const users = copyData[1];

  let filteredImage = images?.filter((image) => {
    return(
     image.name.toLowerCase().includes(query.toLowerCase())
     || image?.owner?.name.toLowerCase().includes(query.toLowerCase()) 
     );
  });

  let filteredUser = users?.filter((user) => {
    return (
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
  <>
  <Input sx={{ mt: 3, mb: 3 }} color="primary" label="Search" id="input-with-icon-adornment" onChange={(e) => setQuery(e.target.value)} value={query}
  startAdornment={ <InputAdornment position="start"> <PageviewIcon fontSize='large' color="primary" /> </InputAdornment>} />

  <ImageList xs={12} md={7} lg={7} sx={{ width: '65%', height: '100%' }} variant="masonry" cols={3} gap={2} >
    {filteredImage?.map((item) => (
    <ImageListItem key={item._id}>
      <img src={`${item.imageUrl}?w=251&fit=crop&auto=format`} srcSet={`${item.imageUrl}?w=251&fit=crop&auto=format&dpr=2 2x`} alt={item.name} loading="lazy"/>
        <Link href={`/home/image/${item._id}`}>
        <ImageListItemBar title={item?.name} subtitle={`@${item?.owner?.username}`} actionIcon={
          <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.name}`}>
            <MoreVertIcon /> 
          </IconButton>}/></Link>
    </ImageListItem>))}
  </ImageList>

  <ImageList xs={12} md={12} lg={12} sx={{ width: '35%', height: '100%' }} variant="masonry" cols={2} gap={1} >
    {filteredUser?.map((item) => (
    <ImageListItem key={item._id}>
      <img src={`${item.image}?w=50&fit=crop&auto=format`} srcSet={`${item.image}?w=50&fit=crop&auto=format&dpr=2 2x`} alt={item.name} loading="lazy"/>
        <Link href={`/profile/${item?._id}`}>
        <ImageListItemBar title={item?.name} subtitle={`@${item?.username}`} actionIcon={
          <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.name}`}>
            <MoreVertIcon />
          </IconButton>}/></Link>
    </ImageListItem>))}
  </ImageList>
  </>
  )
};

export default Explore;
