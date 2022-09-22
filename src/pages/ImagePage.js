import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Comment from '../components/review/comment'
import Like from '../components/review/like'

const ImagePage = () => {
    const {id} = useParams()
    const [image, setImage ] = useState({});


    useEffect(() => {
        axios
             .get(`https://mittens-buffalo.cyclic.app/home/image/${id}`)
             .then((res) => {
                console.log(res)
                setImage(res.data)})
             .catch((err) => console.log(err));
             // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {image?.comments?.map(comment => 
      
      
      <h3 key={comment?._id}>
        <span>{comment?.owner?.username} posted: </span> {comment?.comment}
        </h3>)}

        {image?.likes?.map(like => 
      <h3 key={like?._id}>
        {like?.username} liked this
        </h3>)}

        <h1>This images has {image?.likes?.length} likes</h1>

          {/* get profile by id */}
          </div>
}

<Comment id={id}/>
<Like id={id} />
    </div>
  )
}

export default ImagePage