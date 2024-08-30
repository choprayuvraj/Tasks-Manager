import React, { useState } from 'react'
import AuthContext from './auth-context';

function AuthProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem("token"));

    function setTokenToLS(serverToken) {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    }

    function logoutUser() {
        setToken("");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ setTokenToLS, token, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
