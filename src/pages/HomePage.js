import React, {useContext} from 'react'
import Upload from '../components/upload/upload';
import Feed from '../components/feed/feed';
import {AuthContext} from '../context/context';


const HomePage = () => {
const { logOutUser } = useContext(AuthContext);
// const [images, setAllImages] = useState([]);




  return (
    <div>

        <button onClick={logOutUser}> 
            Logout
        </button>

      <Upload />
      <Feed />

        </div>
   
  )
}

export default HomePage