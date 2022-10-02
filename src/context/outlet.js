import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from '../components/navbar/navbar';

function OutletComponent({setTheme, theme}) {
  return (
    <div>
        <NavBar setTheme={setTheme} theme={theme} />
        <Outlet />

    </div>
  )
}

export default OutletComponent