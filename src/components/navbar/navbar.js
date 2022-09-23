import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom"; 
import {AuthContext} from '../../context/context';


const NavBar = () => {
  const navigate = useNavigate()
  const { logOutUser, user } = useContext(AuthContext);
  const id = user?._id;


  return (
  
    <nav >
        <ul>
          <li><NavLink to={"/home"} > Home</NavLink> </li>
          <li><NavLink to={`/profile/${id}`} > Profile</NavLink> </li>
          <li><NavLink to={"/login"}> Log In</NavLink> </li>
          <li><button onClick={() => {navigate('/join')}}> Join Chat</button> </li>
          <li><NavLink to={"/explore"}> Explore</NavLink> </li>
          <li><button onClick={logOutUser}> Log Out</button> </li>
          
        </ul>
    </nav>
  

  )
}

export default NavBar;