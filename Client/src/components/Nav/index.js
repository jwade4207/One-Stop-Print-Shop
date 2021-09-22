import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
//need new logo & re-size
import logo from '../../assets/images/shopLogo.png'

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
        return (
            <ul className="flex-row">
            <li className="mx-1">
                <Link to="/orderHistory">
                Order History
                </Link>
            </li>
            <li className="mx-1">
                {/* not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                Logout
                </a>
            </li>
            </ul>
        );
        } else {
        return (
            <ul className="flex-row">
            <li className="mx-1">
                <Link to="/signup">
                Signup
                </Link>
            </li>
            <li className="mx-1">
                <Link to="/login">
                Login
                </Link>
            </li>
            </ul>
        );
        }
    }

    return (
        <header className="nav-container">
        <h1>
            <Link className = "nav-link" to="/">
            <img src={logo} alt="Logo" id="logo"></img>
            One Stop Print Shop
            </Link>
        </h1>

        <nav>
            {showNavigation()}
        </nav>
        </header>
    );
}

export default Nav;