import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import './navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/csv" >CSV</Link>
            <Link to="/logout">Logout</Link>
            <DarkModeToggle />
        </nav>
    );
};

export default NavBar;
