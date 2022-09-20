import React, {useContext} from 'react'
import {AuthContext} from '../context/context';


const HomePage = () => {
const { logOutUser } = useContext(AuthContext);






  return (
    <div>
        <button onClick={logOutUser}> 
            Logout
        </button>
    </div>
  )
}

export default HomePage