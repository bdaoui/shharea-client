import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from './pages/Auth'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Can combine all 3 to Auth route @ / and use toggle */}
      <Route path="/home" element={<HomePage />} />

    </Routes>
    </div>
  );
}

export default App;
