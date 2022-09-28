import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import PageviewIcon from "@mui/icons-material/Pageview";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const Explore = () => {
  const storeToken = localStorage.getItem("authToken");

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const one = "http://localhost:5005/home/search/upload";
  const two = "http://localhost:5005/home/search/user";
  const requestOne = axios.get(one, {
    headers: { Authorization: `Bearer ${storeToken}` },
  });
  const requestTwo = axios.get(two, {
    headers: { Authorization: `Bearer ${storeToken}` },
  });

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
    return (
      image.name.toLowerCase().includes(query.toLowerCase()) ||
      image?.owner?.name.toLowerCase().includes(query.toLowerCase())
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
      <Input
        sx={{ mt: 3, mb: 3 }}
        color="primary"
        label="Search"
        id="input-with-icon-adornment"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        startAdornment={
          <InputAdornment position="start">
            {" "}
            <PageviewIcon fontSize="large" color="primary" />{" "}
          </InputAdornment>
        }
      />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{p:2}}>
        <Grid item xs={8} >
        <Typography sx={{mb:4}}> Images </Typography>

          {filteredImage?.map((item) => (
          <Grid container key={item._id} col={1} sx={{pl: {md:"40%"} }} alignItems="center">
              
               <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "150px" }}
              />
          
              <Link href={`/home/image/${item._id}` }>
                <Typography sx={{pl:1}}> {item?.name} </Typography>
              </Link>

         
          </Grid>
          ))}
        </Grid>

        <Grid item xs={2}>
        <Typography sx={{mb:4}} > Users </Typography>

        {filteredUser?.map((item) => (
          <div key={item._id}>
           <Link href={`/profile/${item._id}`}>
              <Typography> @{item?.username} </Typography>
            </Link>
          </div>
        ))}
        </Grid>
      
      </Grid>


    </>
  );
};

export default Explore;
