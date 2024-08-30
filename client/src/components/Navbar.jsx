import React, { useContext } from 'react'
import "../App.css"
import "./Navbar.css"
import { NavLink } from "react-router-dom";
import AuthContext from '../store/auth-context';

function Navbar() {

    const { token, logoutUser } = useContext(AuthContext);

    return (
        <>
            <nav>
                <h1>Tasks Manager</h1>
                <div className="buttons">
                    <NavLink to="/">
                        <button className="home-btn">
                            Home
                        </button>
                    </NavLink>
                    {
                        !!token ?
                            <button onClick={logoutUser}>
                                Logout
                            </button>
                            :
                            <>
                                <NavLink to="/login">
                                    <button className="login-btn">
                                        Login
                                    </button>
                                </NavLink>
                                <NavLink to="/register">
                                    <button className="register-btn">
                                        Register
                                    </button>
                                </NavLink>
                            </>
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbar
