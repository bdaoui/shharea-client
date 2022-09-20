import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Comment from '../components/review/comment'

const ImagePage = () => {
    const {id} = useParams()
    const [image, setImage ] = useState({});


    useEffect(() => {
        axios
             .get(`http://localhost:5005/home/image/${id}`)
             .then((res) => setImage(res.data))
             .catch((err) => console.log(err));
     }, [])
     


  return (
    <div>
        ImagePage

        {image && 
          
          <div>
            <img
              src={image.imageUrl}
              alt={image.name}
              loading="lazy"
              style={{
                display: 'block',
                width: '25%',
              }}
            />
            <h2>{image.name}</h2>
            <span>{image.tags}</span>
            <span>This image was posted by: {image?.owner?.username}</span>
          {/* get profile by id */}
          </div>
}

<Comment id={id}/>
    </div>
  )
}

export default ImagePage