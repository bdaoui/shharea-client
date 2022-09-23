import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import image from "../assets/profile.png";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("https://mittens-buffalo.cyclic.app/auth/signup", {email, password, username, name, image})
            .then(response => console.log(response))
            .catch(err => console.log(err));
            navigate("/");
    }

  return (
    <div>
            <div>

                <h1>
                    Create an account
                </h1>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label
                            for="username">
                            USERNAME
                        </label>
                        <input
                            type="text"
                            placeholder='Enter your username'
                            onChange={(e) => setUsername(e.target.value)} value={username}
                            />
                    </div>

                    <div>
                        <label for="name">
                            name
                        </label>
                        <input type="name"
                            placeholder='Enter your name'
                            onChange={(e) => setName(e.target.value)} value={name}
                            />
                    </div>
                    
                    <div>
                        <label for="email">
                            EMAIL
                        </label>
                        <input type="email"
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        <p >We'll never share your email with anyone else. </p>
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

                    <div >
                        <button type="submit">
                            JOIN SHH-AREA
                        </button>
                    </div>                

                </form>
            </div>
        </div>
);
}

export default SignUpPage;