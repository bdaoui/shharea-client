import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios";
import ProfileCard from '../components/profile/profilecard';

const ProfilePage = () => {
    const {id} = useParams();
    const [ownImages, setOwnImages] = useState([]);
 
    useEffect(() =>{
    axios
        .get(`https://lazy-ruby-cocoon-wig.cyclic.app/user/profile/${id}`)
        .then(response => setOwnImages(response.data))
        .catch(err => console.log(err));
    },[id])    



  


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

            <div> 
              <h2>This Image Has {item?.comments?.length} comments</h2>
              {item?.comments?.map(comment => {
                return <p><span>{comment?.owner?.username} said: </span> {comment.comment}</p>
              })}
            </div>
     </div>
        )})}

    
    </div>
  )
}

export default ProfilePage