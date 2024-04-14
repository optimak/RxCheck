import React, { useEffect, useState } from 'react'
import { baseUrl } from "../../consts";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./SavedMeds.scss";
import pill from '../../assets/icons/pill.png';



function SavedMeds({ id, userMeds, deleteUserMed }) {

    const [filteredMeds, setFilteredMeds] = useState([]);




    useEffect(() => {
        const getUserMeds = async () => {

            try {
                const response = await axios.get(`${baseUrl}users/${id}/meds`)
                setFilteredMeds(response.data)

            } catch (error) {
                console.error(error);

            }

        };
        getUserMeds();

    }, [id,userMeds])

    const unSaveMed = (event, medId) => {
        event.preventDefault()
        event.stopPropagation();
        deleteUserMed(medId, id);
    }

    const profileId = id;


    return (
        <div className='saved-meds'>
            {userMeds.length > 0 ?
                (userMeds.map(med =>
                (<Link key={med.id}
                    className='saved-med__link'
                    to={`/search/${med.medication_id}`}
                    state={{
                        filteredMeds,
                        profileId,
                    }}>
                    <div className='saved-med__card' key={med.medication_id}>

                        <div className='saved-med__name'>
                            <img src={pill} alt='pill' />
                            <div>{med.name}</div>
                            <div onClick={(event) => unSaveMed(event, med.id)} className="saved-med__bookmark">&#9733;</div>

                        </div>

                        <div className='saved-med__details'>


                            <p>
                                <span className="saved-med__detail">Active Ingredient: </span>
                                <br /> {med.active_ingredient}</p>

                        </div>
                    </div>
                </Link>)
                )) : (<div className='saved-meds__message'> No meds saved</div>)}
        </div>
    )
}

export default SavedMeds