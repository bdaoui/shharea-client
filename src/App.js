import './App.css';
import { Route, Routes } from "react-router-dom";
import React from "react"

import Auth from './pages/Auth'
import HomePage from './pages/HomePage'
import ImagePage from './pages/ImagePage'
import ProfilePage from "./pages/ProfilePage"
import Chat from './pages/chat/Chat';
import JoinChat from './pages/chat/JoinChat';
import Explore from './pages/Explore';
import OutletComponent from './context/outlet';
import Error from './pages/Error';


function App() {

  return (
    <div className="App">

    <Routes>
      <Route element={<OutletComponent />} >
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

{/* 
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
    </Routes> */}
  
    </div>
  );
}

export default App;
