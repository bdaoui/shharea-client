import React, {useContext, useState, useEffect} from 'react'
import {AuthContext} from '../../context/context';
import axios from 'axios'


const ProfileCard = ({id}) => {
const { user } = useContext(AuthContext);
const [location, setLocation] = useState("")
const [info, setInfo] = useState("")
const userId = user?._id;
// const [details, setDetails] = useState({})

        
const handleProfile = (e) =>{
    e.preventDefault();
    axios
        .post("http://localhost:5005/user/profile", {userId, location, info})
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
}


  return (
    <div>  


    <div>
        <h3></h3>
    </div>

    

    <div>
        <h3></h3>
    </div>

                 




{ userId === id &&
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