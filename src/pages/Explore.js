import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

      <Grid container xs={12} col={2}>

        {filteredImage?.map((item) => (
          <Grid container xs={6} key={item._id} col={1}>
            <Grid>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "150px" }}
              />
            </Grid>

            <Grid>
              <Link href={`/home/image/${item._id}`}>
                <Typography> {item?.name} </Typography>
              </Link>
            </Grid>

          </Grid>
        ))}

        {filteredUser?.map((item) => (
          <Grid container xs={6} key={item._id} col={1}>
            <Link href={`/home/profile/${item._id}`}>
              <Typography> {item?.username} </Typography>
            </Link>
          </Grid>
        ))}


      </Grid>
    </>
  );
};

export default Explore;
