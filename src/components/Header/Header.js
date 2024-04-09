import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import logo from "../../assets/logo/logo-no-background.png";
import './Header.scss';
import { baseUrl } from "../../consts";
import axios from "axios";



function Header() {
    const [profile, setProfile] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const navigate = useNavigate();
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
        // sessionStorage.removeItem("token");

        sessionStorage.clear();
        setFailedAuth(true);
        setProfile(null);

    };

    //check routes to style header navigation links
    const searchPathRegex = /^\/search\/\d*?$/;
    const isActiveSearch =
        location.pathname === "/search" ||
        searchPathRegex.test(location.pathname);



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


    if (failedAuth) {
        return (<div></div>)
    }


    return (
        <div className='header'>
            <div className='header__left'>
                <Link to='/' >
                    {/* <div className="header__logo" ></div> */}
                    <img className="header__logo" src={logo} alt='logo' />
                </Link>

                <div className='header__functions'>
                    <Link to='/' >
                        <h3
                            className={
                                !isActiveSearch
                                    ? "header__text header__text--active"
                                    : "header__text"
                            }
                        >
                            Home
                        </h3>

                    </Link>

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
                </div>
            </div>
            <div className='header__logout'>
                <Link to='/login' >
                    <h3 className='header__text' onClick={logout}>
                        LOG OUT
                    </h3>

                </Link>


            </div>


        </div>
    )

}

export default Header