import React, { useEffect, useState } from 'react'
import { baseUrl } from "../../consts";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./SavedMeds.scss";
import pill from '../../assets/icons/pill.png';
import saveIcon from '../../assets/icons/save.svg'



function SavedMeds({ id, userMeds, deleteUserMed }) {

    // const [userMeds, setUserMeds] = useState([]);
    const [filteredMeds, setFilteredMeds] = useState([]);

    const getUserMeds = async () => {

        try {
            const response = await axios.get(`${baseUrl}users/${id}/meds`)
            // setProfile(response.data);
            // setUserMeds(response.data);
            setFilteredMeds(response.data)
            // sessionStorage.setItem('userDrugs', JSON.stringify(response.data));


            console.log("Obtaiined MEDS", response.data)
        } catch (error) {
            console.error(error);
            // setFailedAuth(true);
            console.log("NO DATA GOTTEN")
        }

        // setIsLoadingData(false);
    };
    // const deleteUserMed = async (medId) => {

    //     try {
    //         const response = await axios.delete(`${baseUrl}users/${id}/meds/${medId}`)
    //         // setProfile(response.data);
    //         // setUserMeds(response.data)
    //         console.log("deleted MEDS", response.data)
    //     } catch (error) {
    //         console.error(error);
    //         // setFailedAuth(true);
    //         console.log("NO DATA GOTTEN")
    //     }

    //     // setIsLoadingData(false);
    // };

    useEffect(() => {
        getUserMeds();

    }, [])
    const unSaveMed = (event,medId) => {
        event.preventDefault()
        event.stopPropagation(); 
        deleteUserMed(medId, id);
    }

    const profileId = id;


    return (
        <div className='saved-meds'>
            {userMeds.map(med =>
            (<Link key={med.id}
                className='saved-med__link'
                to={`/search/${med.medication_id}`}
                state={{
                    filteredMeds,
                    profileId,
                }}>
                <div className='saved-med__card' key={med.medication_id}>

                    {/* {med.indications} */}
                    <div className='saved-med__name'>
                        <img src={pill} alt='pill' />
                        <div>{med.name}</div>
                        {/* <img className='saved-med__icon' src={saveIcon} alt='pill' /> */}
                        <div onClick={(event)=> unSaveMed(event,med.id)} className="saved-med__bookmark">&#9733;</div>
                        {/* //Filled Star */}
                        {/* <div class="bookmark">&#9734;</div> */}

                    </div>

                    <div className='saved-med__details'>


                        <p>
                            <span className="saved-med__detail">Active Ingredient: </span>
                            <br /> {med.active_ingredient}</p>
                        {/* <p>
                            <span className="saved-med__detail">Indications: </span>
                            {med.indications}</p> */}
                        {/* <p>
                            <span className="saved-med__detail">Side Effects: </span>
                            {med.side_effects}</p>
                        <p>
                            <span className="saved-med__detail">Warning: </span>
                            Always condult your doctor.</p> */}
                    </div>
                </div>
            </Link>)
            )}
        </div>
    )
}

export default SavedMeds