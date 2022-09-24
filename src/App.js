import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from './pages/Auth'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ImagePage from './pages/ImagePage'
import ProfilePage from "./pages/ProfilePage"
import Chat from './pages/chat/Chat';
import JoinChat from './pages/chat/JoinChat';
import Explore from './pages/Explore';
import OutletComponent from './context/outlet';
import Error404
 from './pages/Error404';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route element={<OutletComponent />} >
        <Route path="/" element={<Auth />} />
        {/* Can combine all 3 to Auth route @ / and use toggle */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/image/:id" element={<ImagePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/join" element={<JoinChat />} />


      </Route>
      
      <Route path="/room/:id" element={<Chat />} />
      <Route path="*" element={<Error404 />} />


    </Routes>
    </div>
  );
}

export default App;
