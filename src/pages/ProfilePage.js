import React, {useEffect, useState, useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios";
import ProfileCard from '../components/profile/profilecard';

const ProfilePage = () => {
    const {id} = useParams();
    const [ownImages, setOwnImages] = useState([]);
 
    useEffect(() =>{
    axios
        .get(`http://localhost:5005/user/profile/${id}`)
        .then(response => setOwnImages(response.data))
        .catch(err => console.log(err));
    },[id])    

    axios
        .get( `http://localhost:5005/user/details`, {id} )
        .then(response => console.log(response))
        .catch(err => console.log(err));
   




    return (
    
    <div>ProfilePage
 
    <ProfileCard id={id}/>



    {
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
  
    
     </div>
        )})}

    
    </div>
  )
}

export default ProfilePage