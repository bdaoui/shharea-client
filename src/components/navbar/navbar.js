import React, {useContext} from 'react';
import {NavLink} from "react-router-dom"; 
import {AuthContext} from '../../context/context';

const NavBar = () => {
const { logOutUser, user } = useContext(AuthContext);
const id = user?._id;

// function refreshPage(){ 
//   setTimeout( window?.location?.reload(), 5000); 
// }onClick={() => refreshPage()}
  
  return (
  
    <nav>
        <ul>
          <li><NavLink to={"/home"} > Home</NavLink> </li>
          <li><NavLink to={`/profile/${id}`} > Profile</NavLink> </li>
          <li><NavLink to={"/login"}> Log In</NavLink> </li>
          <li><button onClick={logOutUser}> Log Out</button> </li>
          
        </ul>
    </nav>
  

  )
}

export default NavBar;