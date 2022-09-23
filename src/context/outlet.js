import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from '../components/navbar/navbar';

function OutletComponent() {
  return (
    <div>
        <NavBar />
        <Outlet />

    </div>
  )
}

export default OutletComponent