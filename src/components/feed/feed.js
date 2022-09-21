import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/context';

const Feed = () => {
    const { images, setImages } = useContext(AuthContext);



useEffect(() => {
   axios
        .get('http://localhost:5005/home/images')
        .then((res) => setImages(res.data))
        .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])



   

  return (
    <div>

{images && 
        images.map((item) => {
          return (
          <div key={item._id}>
            <img
              src={item.imageUrl}
              alt={item.name}
              loading="lazy"
              style={{
                display: 'block',
                width: '25%',
              }}
            />
            <Link to={`/home/image/${item._id}`}>{item.name}</Link>
            <span>{item.tags}</span>
            <span>This image was posted by: 
            
              <Link to={`/profile/${item?.owner?._id}`}>
                {item?.owner?.username}
              </Link> 
            </span>
          
          {/* get profile by id */}
          </div>
        )})}


    </div>
  )
}

export default Feed