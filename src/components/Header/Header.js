import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import logo from "../../assets/logo/logo-no-background.png";
import './Header.scss';
import { baseUrl } from "../../consts";
import axios from "axios";



function Header() {
    const [profile, setProfile] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();


    const getProfile = async () => {

        const token = sessionStorage.getItem("token");

        try {
            const response = await axios.get(`${baseUrl}users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile(response.data);
        } catch (error) {
            console.error(error);
            setFailedAuth(true);
        }

        setIsLoading(false);
    };
    const logout = () => {

        sessionStorage.clear();
        setFailedAuth(true);
        setProfile(null);

    };

    //check routes to style header navigation links
    const searchPathRegex = /^\/search\/\d*?$/;
    const isActiveSearch =
        location.pathname === "/search" ||
        searchPathRegex.test(location.pathname);

    const isActiveAbout =
        location.pathname === "/about" ;

    useEffect(() => {
        getProfile()
    }, [])
    if (isLoading) {
        return (
            <main className="dashboard">
                <h1 className="dashboard__title">Dashboard</h1>
                <p>Loading...</p>
            </main>
        )
    }


    if (failedAuth || !profile) {
        return (<div></div>)
    }


    return (
        <>
            <div className='header'>

                <div className='header__inner'>
                    <Link to='/' >
                        <img className="header__logo" src={logo} alt='logo' />
                    </Link>
                    <nav>
                        <ul className="header-nav">
                            <li>
                                <Link to='/' >
                                    <h3
                                        className={
                                            !isActiveSearch && !isActiveAbout
                                                ? "header__text header__text--active"
                                                : "header__text"
                                        }
                                    >
                                        Home
                                    </h3>

                                </Link>

                            </li>
                            <li>
                                <Link to='/search' >
                                    <h3
                                        className={
                                            isActiveSearch
                                                ? "header__text header__text--active"
                                                : "header__text"
                                        }>
                                        Search
                                    </h3>

                                </Link>

                            </li>
                            <li>
                                <Link to='/about' >
                                    <h3
                                        className={
                                            !isActiveSearch && isActiveAbout
                                                ? "header__text header__text--active"
                                                : "header__text"
                                        }>
                                        About
                                    </h3>

                                </Link>

                            </li>
                        </ul>
                        <ul className="header-nav">
                            <li>
                                <Link to='/login' className='header__text header__logout' >
                                    <h3
                                        className='
                                     header__log-text 
                                    header__logout'
                                        onClick={logout}>
                                        LOG OUT
                                    </h3>

                                </Link>

                            </li>
                        </ul>
                    </nav>

                </div>
                {/* <div className='header__logout'>
                    <Link to='/login' >
                        <h3 className='header__text' onClick={logout}>
                            LOG OUT
                        </h3>

                    </Link>


                </div> */}


            </div>
        </>
    )

}

export default Header