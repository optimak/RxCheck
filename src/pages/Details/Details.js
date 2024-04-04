import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useOutletContext } from 'react-router-dom'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal'
import './Details.scss';
import axios from 'axios';
import { baseUrl } from "../../consts";
import pill from '../../assets/icons/pill.png'
import warniing from '../../assets/icons/warniing.png'
import deleteIcon from '../../assets/icons/delete.svg'

import CommentForm from '../../components/CommentForm/CommentForm';






function Details() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState(null);
    const { medId } = useParams()
    const location = useLocation();
    // const { filteredMeds } = location.state;
    const [comments, setComments] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingUserMeds, setIsLoadingUserMeds] = useState(true);

    const [medData, setMedData] = useState([]);
    const [profileId, setProfileId] = useState(null);
    const { profile } = useOutletContext();
    const [userMeds, setUserMeds] = useState([]);


    const preexistingConditionsKeywords =
        [
            ["Severe kidney disease", "Renal impairment",
                "Anuria"], ["Liver disease", "Hepatic impairment"],
            ["Heart failure", "Bradycardia", "Hypotension", "Severe hypertension", "Tachyarrhythmias"
            ],
            ["Allergy to", "History of allergic reaction"], ["Pregnancy"], []
        ]
    const preexistingConditions =
        [
            "Kidney Disease",
            "Liver Disease",
            "Heart Conditions",
            "Allergies and Sensitivities",
            "Pregnancy", "none"


        ];

    // const getUserMeds = async () => {

    //     try {
    //         const response = await axios.get(`${baseUrl}users/${profileId}/meds`)
    //         // setProfile(response.data);
    //         setUserMeds(response.data);
    //         // setFilteredMeds(response.data)
    //         setIsLoadingUserMeds(false)

    //         console.log("Obtaiined MEDS", response.data)
    //     } catch (error) {
    //         console.error(error);
    //         // setFailedAuth(true);
    //         console.log("NO DATA GOTTEN")
    //     }

    //     // setIsLoadingData(false);
    // };

    const deleteUserMed = async (medId) => {

        try {
            const response = await axios.delete(`${baseUrl}users/${profileId}/meds/${medId}`)
            // setProfile(response.data);
            // setUserMeds(response.data)
            console.log("deleted MEDS", response.data)
        } catch (error) {
            console.error(error);
            // setFailedAuth(true);
            console.log("NO DATA GOTTEN")
        }

        // setIsLoadingData(false);
    };
    const addUserMed = async (medId) => {
        const savedMed = {
            medication_id: medId
        }
        try {
            const response = await axios.post(`${baseUrl}users/${profileId}/meds/${medId}`)
            // setProfile(response.data);
            // setUserMeds(response.data)
            console.log("saved MEDS", response.data)
        } catch (error) {
            console.error(error);
            // setFailedAuth(true);
            console.log("NO DATA GOTTEN")
        }

        // setIsLoadingData(false);
    };


    const checkConditions = () => {
        const index = preexistingConditions.indexOf(profile.preexisting_conditions);
        // if (!index){
        //     return false
        // }
        const keywords = preexistingConditionsKeywords[index];
        // filtered = filtered.filter(item =>
        //     item.indications && keywords.some(keyword =>
        //         item.indications.toLowerCase().includes(keyword.toLowerCase())
        //     )
        // );
        return med.contra_indications && keywords.some(keyword =>
            med.contra_indications.toLowerCase().includes(keyword.toLowerCase())
        )
    }
    // console.log(checkConditions())




    console.log(profile, "PROFILE")


    const getMedComments = async () => {
        try {
            const response = await axios.get(`${baseUrl}comments/${medId}`);
            console.log("RESPONSE", comments)
            if (response.data.length > 1) {
                let comments = response.data;
                comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setComments(comments)

            } else {
                setComments(response.data)

            }

        } catch (error) {
            console.error(error);
            console.log("NO COMMENTS GOTTEN")

        }
    }
    const getMeds = async () => {

        try {
            const response = await axios.get(`${baseUrl}medications`)
            // setProfile(response.data);
            setMedData(response.data)
            console.log("Obtaiined DATAA", response.data)
            setIsLoadingData(false);

        } catch (error) {
            console.error(error);
            // setFailedAuth(true);
            console.log("NO DATA GOTTEN")
        }

    };
    const deleteComment = async (commentId) => {

        try {
            await axios.delete(`${baseUrl}comments/${commentId}`)
            console.log("deleted")

        } catch (error) {
            console.error(error);
        }

    };
    const handleDeleteClick = (commentId) => {
        setIsModalOpen(true);
        setCurrentCommentId(commentId);
        ///


    };
    const handleDeleteConfirm = (commentId) => {
        // Logic to delete the comment, e.g., remove it from the state
        // setComments(comments.filter(comment => comment.id !== commentId));
        deleteComment(commentId)
        // Logic to delete the comment, e.g., an API call to your backend
        console.log(`Deleting comment with ID: ${commentId}`);
        window.location.reload();
        setIsModalOpen(false); // Close the modal
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal
    };



    useEffect(() => {
        sessionStorage.setItem('myPageState', JSON.stringify(location.state));
    }, [location.state]);

    useEffect(() => {
        const savedState = JSON.parse(sessionStorage.getItem('myPageState'));
        setProfileId(JSON.parse(sessionStorage.getItem('profileId')));
        if (savedState) {
            // Use savedState as needed
            console.log("SAVED STATE")
            setMedData(savedState.medData ?? savedState.filteredMeds)
        }
        // getUserMeds();
        const userDrugs = JSON.parse(sessionStorage.getItem('userDrugs'));
        setUserMeds(JSON.parse(sessionStorage.getItem('userDrugs')));
        if (userDrugs) {
            // Use savedState as needed
            console.log("USER MEDS", userDrugs)
            setIsLoadingUserMeds(false)
            // setMedData(savedState.medData ?? savedState.filteredMeds)
        }

    }, []);





    useEffect(() => {
        window.scrollTo(0, 0);
        const savedState = JSON.parse(sessionStorage.getItem('myPageState'));

        if (location.state && location.state.filteredMeds) {
            setMedData(location.state.filteredMeds);
            setIsLoadingData(false);
            // setProfile(location.state.profileId)


        } else if (savedState.filteredMeds) {
            setMedData(savedState.filteredMeds);
            setIsLoadingData(false);
            // setProfile(savedState.profileId)
        } else if (savedState.medData) {
            setMedData(savedState.medData);
            setIsLoadingData(false);
            // setProfile(savedState.profileId)
        }
        else {
            getMeds();
        }
        getMedComments();
        // getUserMeds();

    }, [location.state, medId]);


    console.log("dets", medId, comments, medData, profileId, location.state)
    let med = medData.find(drug => drug.id === Number(medId));
    if (!med && location.state && location.state.filteredMeds) {
        med = location.state.filteredMeds[0]
    }
    // console.log(checkConditions())
    // const profileId = profile.id; 
    const isSaved = () => {
        if (userMeds.length === 0) {
            return false
        }
        return userMeds.some(userMed =>
            userMed.user_id === profileId && userMed.medication_id === med.id)
    }
    console.log(isLoadingData,isLoadingUserMeds)

    return (
        <div className='details'>
            {isLoadingData 
            || isLoadingUserMeds
             ? (
                // <p> 
                    <img src={pill} 
                style={{ width: '100px', height: '100px', margin: '0 auto' }}
                alt='pill' />
                 //{/* Loading...</p> */}
            ) : (

                <>
                    <div className='details__all'>
                        {/* {isLoadingData || (userMeds.length === 0) ? (
                    <p>Loading...</p>
                ) : ( */}
                        <div className='details__med'>

                            <div className='details__med-name'>
                                <img src={pill} alt='pill' />
                                <h3>{med.name}</h3>
                                <div className='saved-icons'>
                                    {isSaved()
                                        ? (<div class="saved-icon">&#9733; </div>) : (<div class="saved-icon--not">&#9734;</div>)
                                    }
                                    {/* {`${JSON.stringify(userMeds)}`} */}
                                    {/* {`${isSaved()}`} */}

                                    {/* {`${userMeds.some(userMed =>
                                    userMed.user_id === profileId && userMed.medication_id === med.id)},${userMeds[0].id}`} */}
                                    {/* <div class="saved-icon">&#9733;</div>  <div class="saved-icon--not">&#9734;</div> */}
                                    {/* <div class="saved-icon">&#9733;</div> */}
                                    {/* //Filled Star */}
                                    {/* <div class="bookmark">&#9734;</div> */}
                                </div>
                            </div>
                            <div className='details__med-divider'> </div>
                            <div className='details__med-details'>

                                <p className='details__med-text'> <strong> Used for {med.indications} </strong> </p>
                                <div>
                                    <p className='details__med-subtitle'> ACTIVE INGREDIENT</p>
                                    <p className='details__med-text'>{med.active_ingredient} </p>
                                </div>
                                <div>
                                    <p className='details__med-subtitle'> SIDE EFFECTS INCLUDE</p>
                                    <p className='details__med-text'>{med.side_effects} </p>
                                </div>
                                <div>
                                    <p className='details__med-subtitle'> AVOID IF YOU HAVE</p>
                                    <p className='details__med-text'>{med.contra_indications} </p>
                                </div>
                                <div>
                                    <p className='details__med-subtitle'> FOOD INTERACTIONS</p>
                                    <p className='details__med-text'>{med.food_interactions} </p>
                                </div>

                            </div>
                            <div className='details__med-divider'> </div>

                            {(checkConditions()) ?
                                (<div className='details__med-warning'>
                                    <img src={warniing} alt='warning' />
                                    <div className='details__med-warning-styler'>
                                        <div> {med.name} may not be suitable for you due to your pre-existing condition, {profile.preexisting_conditions.toLowerCase()}. </div>
                                        <div>Please consult your doctor before considering this medication. </div>
                                    </div>
                                </div>)
                                : (<div> </div>)}
                            <div className='details__med-divider'> </div>

                            <CommentForm medId={medId} profileId={profileId} />


                            <div className='details__med-divider'> </div>
                            {(comments.length === 0) ?
                                (<div className='details__med-comments'> Be the first to write a review 😊 </div>) :
                                (<div className='details__med-comments'>
                                    <p className="details__label" >
                                        REVIEWS
                                    </p>
                                    {comments.map(comment =>

                                        <div className='details__med-comment' key={comment.id}>

                                            <div className='details__med-comment-image' > </div>

                                            <div className='details__med-comment-right-styler'>
                                                <div className='details__med-comment-top'> <h6 className='details__med-subtitle'> {comment.user_name} </h6>
                                                    <p className='details__med-date'>{new Date(comment.updated_at).toLocaleDateString('en-US')}</p>
                                                </div>
                                                <div className='details__med-comment-bottom'>
                                                    <p>  {comment.content} </p>
                                                    {comment.user_id === profileId && (
                                                        // <button onClick={() => handleDelete(comment.id)}>Delete</button>
                                                        <img src={deleteIcon} alt='delete' onClick={() => handleDeleteClick(comment.id)} />
                                                    )}
                                                </div>
                                            </div>


                                        </div>

                                    )}

                                </div>)
                            }

                        </div>


                        <div className='details__drug-list'>


                            {medData.map(med =>
                            (<Link key={med.id}
                                className='details__drug-link'
                                to={`/search/${med.id}`}
                                state={{ medData, profileId }}>
                                <div className='details__drug-card' key={med.id}>

                                    {/* {med.indications} */}
                                    <div className='details__drug-name'>
                                        {med.name}

                                    </div>

                                    <div className='details__drug-details'>


                                        <h6 className="details__drug-subtitle">
                                            ACTIVE INGREDIENT </h6>
                                        <h6 className="details__drug-detail "> {med.active_ingredient}</h6>

                                    </div>
                                </div>
                            </Link>)
                            )}


                        </div>
                    </div> 
                    </>
            )}

                    <DeleteConfirmationModal
                        isOpen={isModalOpen}
                        onDeleteConfirm={handleDeleteConfirm}
                        onCancel={handleCancel}
                        itemId={currentCommentId}
                    />

                </div>
       
    )
}

        // </div >


    
export default Details