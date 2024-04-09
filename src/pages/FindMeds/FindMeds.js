import "./FindMeds.scss";
import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { baseUrl } from "../../consts";
import axios from "axios";
import InputField from "../../components/InputField/InputField";
import SearchBar from "../../components/SearchBar/SearchBar";
// import SearchPage from "../SearchPage/SearchPage";
import './FindMeds.scss';
import { useNavigate } from "react-router-dom";


function FindMeds({userMeds}) {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [failedAuth, setFailedAuth] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [medData, setMedData] = useState([]);
    const [filteredMeds, setFilteredMeds] = useState([]);
    const navigate = useNavigate();




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
        sessionStorage.removeItem("token");
        setFailedAuth(true);
        setProfile(null);
    };





    const getMeds = async () => {

        try {
            const response = await axios.get(`${baseUrl}medications`)
            // setProfile(response.data);
            setMedData(response.data)
            console.log("Obtaiined DATAA", response.data)
        } catch (error) {
            console.error(error);
            // setFailedAuth(true);
            console.log("NO DATA GOTTEN")
        }

        setIsLoadingData(false);
    };



    useEffect(() => {
        getProfile();



    }, [failedAuth, isLoading, isLoadingData]);
    useEffect(() => {
        getMeds();
    }, [])

    if (failedAuth) {
        return (
            navigate("/")
        )
    }
    if (isLoading || isLoadingData || !filteredMeds) {
        return (
            <main className="dashboard">
                <h1 className="dashboard__title">Dashboard</h1>
                <p>Loading...</p>
            </main>
        )
    }
console.log("FILTERED",filteredMeds)
//below is valid 
    const profileId = profile.id; 







    const filterMeds = (filteredData) => {
        setFilteredMeds(filteredData);
        
    };
    return (
        <main className="search">
            {/* <div className="search__message">
                <p>Welcome back, {profile.full_name}</p>

                <h2>My Profile</h2>
                <p>{profile.age}</p>
                <p>{profile.email}</p>

                <button onClick={logout}>
                    Log out
                </button>

            </div> */}

            <h1 className="search__title">Find Medications</h1>
            <div className="search__options">
                <Link className="search__options-link " to='/search'> <div> Search</div></Link>
                {/* <Link className="search__options-link " to={`/search/${medData[0].id}`} state={{ filteredMeds, profileId }}> <div> List</div></Link> */}
                <Link className="search__options-link " to={`/search/${medData[0].id}`} state={{ filteredMeds, profileId }}> <div> List</div></Link>

                {/* <div> List</div> */}
            </div>

            <div>
                <SearchBar onFilter={filterMeds} data={medData} />
            </div>


            <Outlet context={{ filteredMeds,profileId,profile }} />


        </main>
    );
}


export default FindMeds