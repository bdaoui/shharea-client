import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../context/context';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setErrorMessage] = useState(undefined);
  const { setToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
      const requestBody = { email, password };
    
      axios
          .post(`http://localhost:5005/auth/login`, requestBody)
          .then((response) => {
            console.log("JWT token", response.data.authToken);
            setToken(response.data.authToken);
            authenticateUser();
            navigate("/home");
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-sky-400 rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-gray-600 lg:max-w-xl bg-scroll">

                <h1 className="text-3xl text-gray-50 font-amita font-semibold text-center  uppercase decoration-wavy">
                    Create an account
                </h1>

                <form className="mt-6" onSubmit={handleLoginSubmit}>
                    
                    <div className="mb-2">
                        <label for="email" className="block text-base text-gray-50 font-amita font-semibold">
                            EMAIL
                        </label>
                        <input type="email"
                            className="block w-full px-4 py-2 mt-2 mb-2 tracking-widest font-amita text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        <p className='text-xs font-medium tracking-widest text-gray-50 font-lobster mb-5'>We'll never share your email with anyone else. </p>
                    </div>

                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-base tracking-widest text-gray-50 font-amita font-semibold"
                        >
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 mb-2 tracking-widest font-amita text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"g
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                    </div>

                    <div className="mt-6">
                        <button className="w-full bg-gray-50 px-4 py-2 font-amita text-gray-700 text-lg font-black tracking-widest transition-colors duration-200 transform rounded-md hover:bg-slate-300 focus:outline-none focus:bg-slate-300"
                        type="submit">
                            JOIN SHH-AREA
                        </button>
                    </div>                

                </form>
            </div>
        </div>
  )
}

export default LoginPage