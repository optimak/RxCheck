import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import logo from "../../assets/logo/logo-no-background.png";
import './Header.scss';

function Header() {
    const [profile, setProfile] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const logout = () => {
        sessionStorage.removeItem("token");
        setFailedAuth(true);
        setProfile(null);
    };

    //   useEffect(() => {
    //     getProfile();
    //   }, []);

    if (failedAuth) {
        return (
            <main className="dashboard">
                <h1 className="dashboard__title">Dashboard</h1>
                <p>You must be logged in to see this page.</p>
                <p><Link to="/login">Log in</Link></p>
            </main>
        )
    }
    return (
        <div className='header'>
            <Link to='/' >
                {/* <div className="header__logo" ></div> */}
                <img className="header__logo" src={logo} alt='logo' /> 
            </Link>

            <div className='header__functions'>
                <Link to='/' >
                    <h3 className='header__text'>
                        Dashboard
                    </h3>

                </Link>

                <Link to='/search' >
                    <h3 className='header__text'>
                        Search
                    </h3>

                </Link>
                <Link to='/login' >
                    <h3 className='header__text' onClick={logout}>
                        Log Out
                    </h3>

                </Link>


            </div>

        </div>
    )
}

export default Header