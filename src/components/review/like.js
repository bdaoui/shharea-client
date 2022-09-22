import axios from 'axios'
import React, {useContext} from 'react'
import {AuthContext} from '../../context/context';


const Like = ({id}) => {
  const {user} = useContext(AuthContext);
  const imageId = id;
  const userId = user?._id;

  const handleLike = (e) => {
    e.preventDefault();  
    axios
        .post(`https://mittens-buffalo.cyclic.app/home/image/like`, {userId, imageId})
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
  }

  return (
    <div>
      
      <button onClick={handleLike}>
        Like
      </button>
    </div>
  )
}

export default Like