import "./FindMeds.scss";
import { useCallback, useEffect, useState } from 'react';
import {  NavLink, Outlet,useLocation } from "react-router-dom";

import { baseUrl } from "../../consts";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import './FindMeds.scss';
import { useNavigate } from "react-router-dom";
import pill from '../../assets/icons/pill.png'



function FindMeds({ userMeds }) {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [failedAuth, setFailedAuth] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [medData, setMedData] = useState([]);
    const [filteredMeds, setFilteredMeds] = useState([]);
    const location = useLocation();

    const navigate = useNavigate();

    const isListActive = location.pathname.startsWith('/search/');



    const getProfile = async () => {
        const token = sessionStorage.getItem("token");
        try {
            const response = await axios.get(`${baseUrl}users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile(response.data);
            console.log("GOT PROFIL")
        } catch (error) {
            console.error(error);
            setFailedAuth(true);
        }

        setIsLoading(false);
    };






    const getMeds = async () => {

        try {
            const response = await axios.get(`${baseUrl}medications`)
            setMedData(response.data)

        } catch (error) {
            console.error(error);
        }

        setIsLoadingData(false);
    };



    useEffect(() => {
        getProfile();



    }, [failedAuth, isLoading, isLoadingData]);
    useEffect(() => {
        getMeds();
    }, [])
    
    const filterMeds = useCallback((filteredData) => {
        setFilteredMeds(filteredData);

    },[]);

    if (failedAuth) {
        return (
            navigate("/")
        )
    }
    if (isLoading || isLoadingData || !filteredMeds) {
        return (
            <main className="dashboard">
                {/* <h1 className="dashboard__title">Find Medications</h1> */}
                <img src={pill}
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                        alt='pill' />
                <p>Loading...</p>
            </main>
        )
    }
    //below is valid 
    const profileId = profile.id;







   
    return (

    
            <main className="search">
                <h1 className="search__title">Find Medications</h1>
                <div className="search__options">
                    <NavLink 
                    className={({ isActive }) => "search__options-link" + (isActive ? " active" : "")}
                             to="/search"
                             end>
                        <div>Search</div>
                    </NavLink>
                    <NavLink className={ "search__options-link" + (isListActive ? " active" : "")}
                             to={`/search/${medData[0].id}`} state={{ filteredMeds, profileId }}  >
                        <div>List</div>
                    </NavLink>
                </div>
                <div>
                    <SearchBar onFilter={filterMeds} data={medData} />
                </div>
                <Outlet context={{ filteredMeds, profileId, profile }} />
            </main>
       
    );
}


export default FindMeds