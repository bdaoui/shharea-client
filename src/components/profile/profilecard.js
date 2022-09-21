import React, {useContext, useState, useEffect} from 'react'
import {AuthContext} from '../../context/context';
import axios from 'axios'


const ProfileCard = ({id}) => {
const { user, toggle, setToggle } = useContext(AuthContext);
const [location, setLocation] = useState("")
const [info, setInfo] = useState("")
const userId = user?._id;
const [details, setDetails] = useState({})
const [friend, setFriend] = useState(false)

useEffect(()=>{
    axios
    .get( `http://localhost:5005/user/${id}/details` )
    .then(response => setDetails(response.data))
    .catch(err => console.log(err));
    // eslint-disable-next-line
}, [])




const handleProfile = (e) =>{
    e.preventDefault();
    axios
        .post("http://localhost:5005/user/profile", {userId, location, info})
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
}



const handleFriendship = async () => {
    await friend ? setFriend(false) : setFriend(true);
    try{
       const friendsResponse = await axios.post(`http://localhost:5005/user/${id}/friends`, {userId})
       console.log(friendsResponse);
    }
   catch(error) {console.log(error)}
}



// Show and Hide Edit Form

const toggler = () => {
    if(toggle === false){
        setToggle(true)
    } else {
        setToggle(false)
    }
}


  return (
    <div>  
        
    
        <div>
            <h1>Name: <span>{details?.name}</span> </h1> 
            <h2>Location: <span>{details?.location}</span></h2>
            <h2>Info:</h2>
            <p>{details?.info}</p>

            {userId === id && 
                <button onClick={toggler}>Edit</button>
            }
            
            {/* Shows if not current user */}
            {!(userId === id) && 
                <button onClick={handleFriendship}>Friend Request</button>
            }
            

        </div>


    { toggle &&
    <>
    <form onSubmit={handleProfile}>
        <div>
            <label
                for="location">
                Location
            </label>
            <input
                type="text"
                placeholder='Enter your location'
                onChange={(e) => setLocation(e.target.value)} value={location}
                />
        </div>

        

        <div>
            <label for="info">
                Info
            </label>
            <textarea
                type="text"
                placeholder='Enter anything you want to share'
                onChange={(e) => setInfo(e.target.value)} value={info}
                />
        </div>

        <div >
            <button type="submit">
                Update profile
            </button>
        </div>                

    </form>
    </>
    }

 </div>
  )
}

export default ProfileCard