import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from '../components/navbar/navbar';
import ResponsiveAppBar from '../components/navbar/responsiveappbar';

function OutletComponent() {
  return (
    <div>
        <ResponsiveAppBar />
        <Outlet />

    </div>
  )
}

export default OutletComponent