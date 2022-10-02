import './App.css';
import { Route, Routes } from "react-router-dom";
import React, {useContext, useState} from "react"

import Auth from './pages/Auth'
import HomePage from './pages/HomePage'
import ImagePage from './pages/ImagePage'
import ProfilePage from "./pages/ProfilePage"
import Chat from './pages/chat/Chat';
import JoinChat from './pages/chat/JoinChat';
import Explore from './pages/Explore';
import OutletComponent from './context/outlet';
import Error from './pages/Error';
import {AuthContext} from './context/context'

import { ThemeProvider, createTheme, CssBaseline   } from '@mui/material';

export  const lightTheme  = createTheme (
  {
    palette: {
        background: {
          default:  '#FFFFFF',
          paper: '#0c0c0c',

        },
        primary: {
          main: '#0CD3FC',
        },
        secondary: {
          main: '#F06FCB',
        },
        error: {
          main: '#A495D8',
        },
        text: {
          primary: '#000000',
          secondary: '#000000',
        },
      
        
      },  

});

export  const darkTheme  = createTheme (
  {
    palette: {
        background: {
          default:  '#4c4a4a',
          paper: '#0c0c0c',

        },
        primary: {
          main: '#0CD3FC',
        },
        secondary: {
          main: '#F06FCB',
        },
        error: {
          main: '#A495D8',
        },
        text: {
          primary: '#ffffff',
          secondary: '#FFFFFF',
        },
      
        
      },  

});


function App() {
const [theme, setTheme] = useState(true)
const {isLoggedIn} = useContext(AuthContext);

  return (
    <div className="App">
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <CssBaseline />

    {isLoggedIn &&
    <Routes>
      <Route element={<OutletComponent setTheme={setTheme} theme={theme}/>} >
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/image/:id" element={<ImagePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/join" element={<JoinChat />} />
      </Route>
      
      <Route path="/room/:id" element={<Chat />} />
      <Route path="" element={<Error />} />
    </Routes>
    }

    {!isLoggedIn &&
    <Routes>
      <Route element={<OutletComponent />} >
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Auth />} />
        <Route path="/home/image/:id" element={<Auth />} />
        <Route path="/profile/:id" element={<Auth />} />
        <Route path="/explore" element={<Auth/>} />
        <Route path="/join" element={<Auth />} />
      </Route>
      
      <Route path="/room/:id" element={<Auth />} />
      <Route path="" element={<Error />} />
    </Routes>
    }

      </ThemeProvider>

    </div>
  );
}

export default App;
