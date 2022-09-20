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
            <span>This image was posted by: {item?.owner?.username}</span>
          {/* get profile by id */}
          </div>
        )})}


    </div>
  )
}

export default Feed