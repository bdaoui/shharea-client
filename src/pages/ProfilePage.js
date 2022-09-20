import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios";
const ProfilePage = () => {
    const {id} = useParams();
    const [ownImages, setOwnImages] = useState([]);

    useEffect(() =>{
    axios
        .get(`https://lazy-ruby-cocoon-wig.cyclic.app/user/profile/${id}`)
        .then(response => setOwnImages(...ownImages, response.data))
        .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
    
    <div>ProfilePage
    
    {
        ownImages && 
        ownImages.map( item =>{
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