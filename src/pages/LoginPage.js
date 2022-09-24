import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../context/context';

const LoginPage = ({toggler}) => {
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
            const errorDescription = error?.response?.data?.message;
            setErrorMessage(errorDescription);
          });
      };

  return (
    <div>
            <div>

                <h1>
                    Login
                </h1>

                <form onSubmit={handleLoginSubmit}>
                    
                    <div>
                        <label for="email">
                            EMAIL
                        </label>
                        <input type="email"
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                    </div>

                    <div>
                        <label for="password">
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                    </div>

                    <div>
                        <button type="submit">
                            ENTER SHH-AREA
                        </button>
                    </div> 
                </form>
<br></br>
<br></br>

                    <div>
                        <button onClick={toggler}>
                            Need an account?
                        </button>
                    </div>               

               
            </div>
        </div>
  )
}

export default LoginPage