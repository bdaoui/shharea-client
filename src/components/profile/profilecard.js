import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/context";
import axios from "axios";

const ProfileCard = ({ id }) => {
  const { user, toggle, setToggle } = useContext(AuthContext);
  const userId = user?._id;
  const userEmail = user?.email;
  const userUserName = user?.username;
  const userInfo = user?.info;
  const userLocation = user?.location;

  const [details, setDetails] = useState({});
  const [email, setEmail] = useState(userEmail);
  const [username, setUsername] = useState(userUserName);
  const [info, setInfo] = useState(userInfo);
  const [location, setLocation] = useState(userLocation);

  const [friend, setFriend] = useState(false);


  useEffect(() => {
    axios
      .get(`http://localhost:5005/user/${id}/details`)
      .then((response) => setDetails(response.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleProfile =  (e) => {
    e.preventDefault();

     const updateProfile = new FormData();
        updateProfile.append("image", (e.target.image.files[0]?e.target.image.files[0]: details?.image ) );
        updateProfile.append("username", (username? username : details?.username) );
        updateProfile.append("userId", userId);
        updateProfile.append("location", (location? location : details?.location));
        updateProfile.append("info", (info? info : details?.info));
        updateProfile.append("email", (email? email : details?.email));

    

    axios
      .post("http://localhost:5005/user/profile", updateProfile )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const handleFriendship = async () => {
    (await friend) ? setFriend(false) : setFriend(true);
    try {
      const friendsResponse = await axios.post(
        `http://localhost:5005/user/${id}/friends`,
        { userId }
      );
      console.log(friendsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  // Show and Hide Edit Form

  const toggler = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };


  return (
    <div>
      <div>
        <img src={details?.image} alt={details?.name} style={{height: "100px", width: "100px", borderRadius:"10px" }}/>

        <h1>
          Name: <span>{details?.name}</span>{" "}
        </h1>
        <h2>
          Location: <span>{details?.location}</span>
        </h2>
        <h2>Info:</h2>
        <p>{details?.info}</p>

        {userId === id && <button onClick={toggler}>Edit</button>}

        {/* Shows if not current user, FRIEND REQUEST*/}
        {!(userId === id) && (
          <button onClick={handleFriendship}>Friend Request</button>
        )}
      </div>

      {/* Edit User Information Section*/}

      {toggle && (
        <>
          <form onSubmit={handleProfile}>
            <div>
              <label for="image">Profile Picture</label>
              <input type="file" name="image"/>
            </div> 
            <div>
              <label for="username">username</label>
              <input
                type="text"
                placeholder={details.username}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div> 
            <div>
              <label for="email">email</label>
              <input
                type="text"
                placeholder={details.email}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div> 
            <div>
              <label for="location">Location</label>
              <input
                type="text"
                placeholder={details.location}
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>

            <div>
              <label for="info">Info</label>
              <textarea
                type="text"
                placeholder={details.info}
                onChange={(e) => setInfo(e.target.value)}
                value={info}
              />
            </div>


            <div>
              <button type="submit">Update profile</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
