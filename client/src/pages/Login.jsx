import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom";
import "./Login.css"
import AuthContext from '../store/auth-context';

function Login() {

    const {setTokenToLS} = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Login Successful");
                const resData = await response.json();
                setTokenToLS(resData.token);
                setData({
                    email: "",
                    password: ""
                });
                navigate("/");
            }
        }
        catch (error) {
            console.error("Login Error", error);
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div className="email-div">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    value={data.email}
                    onChange={handleInput}
                />
            </div>
            <div className="password-div">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    name='password'
                    value={data.password}
                    onChange={handleInput}
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login
