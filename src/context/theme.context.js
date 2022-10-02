import React from "react";
import { createContext, useState, useEffect } from "react";


const ThemeContext = (props) =>{

return(
<ThemeContext.Provider value={ThemeContext}>
    {props.children}
</ThemeContext.Provider>
)
}