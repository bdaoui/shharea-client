import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from './pages/Auth'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ImagePage from './pages/ImagePage'
import ProfilePage from "./pages/ProfilePage"
import NavBar from './components/navbar/navbar';
import Chat from './pages/chat/Chat';
import JoinChat from './pages/chat/JoinChat';

function App() {
  return (
    <div className="App">
    <NavBar />
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Can combine all 3 to Auth route @ / and use toggle */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/image/:id" element={<ImagePage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/join" element={<JoinChat />} />
      <Route path="/room/:id" element={<Chat />} /> 

    </Routes>
    </div>
  );
}

export default App;
