import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const Explore = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const one = "https://mittens-buffalo.cyclic.app/home/search/upload";
  const two = "https://mittens-buffalo.cyclic.app/home/search/user";
  const three = "https://mittens-buffalo.cyclic.app/home/search/comment";
  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);

  useEffect(() => {
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          setData([responses[0].data, responses[1].data, responses[2].data]);
        })
      )
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const copyData = [...data];

  const images = copyData[0];
  const users = copyData[1];
  // const comments = copyData[2];

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

  // let filteredComment = comments?.filter((comment) => {
  //   return comment.comment.toLowerCase().includes(query.toLowerCase());
  // });



  console.log(images)
  return (
    <div>
    <div>
      <input
        label="search"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>

    <div>
      <h1>Users</h1>
       <ul>
          {filteredUser?.map(user =>

          <Link key={user._id} to={`/profile/${user._id}`}> 
            <li >This is: {user.name} AKA: {user.username}</li>
          </Link>
            )}
 
       </ul>
    </div>
    
    <div>
      <h1>Images</h1>
       {filteredImage?.map(image => 
       <div key={image._id}>
       <Link to={`/home/image/${image._id}`}>{image.name}</Link>
          <img src={image.imageUrl} alt={image.name} style={{width: "200px"}}/>
       </div>

       )}

    </div>



    </div>
  );
};

export default Explore;
