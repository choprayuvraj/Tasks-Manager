import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import "./App.css";

function Layout() {
    return (
        <>
            <div className="body">
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout
