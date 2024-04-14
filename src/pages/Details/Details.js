import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useOutletContext } from 'react-router-dom'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal'
import CommentForm from '../../components/CommentForm/CommentForm';
import axios from 'axios';
import { baseUrl } from "../../consts";
import pill from '../../assets/icons/pill.png'
import warniing from '../../assets/icons/warniing.png'
import deleteIcon from '../../assets/icons/delete.svg'
import './Details.scss';







function Details({ userMeds, updateUserDrugs, deleteUserMed,updateUserCommentList }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState(null);
    const { medId } = useParams()
    const location = useLocation();
    const [comments, setComments] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [medData, setMedData] = useState([]);
    // const [profileId, setProfileId] = useState(null);
    const { profile } = useOutletContext();
    const [isSavedMed, setIsSavedMed] = useState(null)

    const profileId = profile.id;
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




    //check pre-existing conditions
    const checkConditions = () => {
        const index = preexistingConditions.indexOf(profile.preexisting_conditions);

        const keywords = preexistingConditionsKeywords[index];

        return med.contra_indications && keywords.some(keyword =>
            med.contra_indications.toLowerCase().includes(keyword.toLowerCase())
        )
    }







    const getMeds = async () => {

        try {
            const response = await axios.get(`${baseUrl}medications`)
            setMedData(response.data)
            setIsLoadingData(false);

        } catch (error) {
            console.error(error);

        }

    };


    //Comment section functions

    const deleteComment = async (commentId) => {

        try {
            await axios.delete(`${baseUrl}comments/${commentId}`)

        } catch (error) {
            console.error(error);
        }

    };
    const handleDeleteClick = (commentId) => {
        setIsModalOpen(true);
        setCurrentCommentId(commentId);


    };

    const handleDeleteConfirm = async (commentId) => {

        await deleteComment(commentId)
        window.location.reload();
        setIsModalOpen(false); // Close the modal
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal
    };



    //useEffects
    useEffect(() => {
        sessionStorage.setItem('myPageState', JSON.stringify(location.state));
        console.log("location.state",location.state)
    }, [location.state]);

    useEffect(() => {
        const savedState = JSON.parse(sessionStorage.getItem('myPageState'));
        if (savedState) {
            setMedData(savedState.medData ?? savedState.filteredMeds ?? savedState.allMeds)
        }


    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
        const savedState = JSON.parse(sessionStorage.getItem('myPageState'));

        if (location.state && location.state.filteredMeds) {
            setMedData(location.state.filteredMeds);
            setIsLoadingData(false);


        } else if (savedState && savedState.filteredMeds) {
            setMedData(savedState.filteredMeds);
            setIsLoadingData(false);
        } else if (savedState && savedState.medData) {
            setMedData(savedState.medData);
            setIsLoadingData(false);
        }
        else {
            getMeds();
        }

        const getMedComments = async () => {
            try {
                const response = await axios.get(`${baseUrl}comments/${medId}`);
                if (response.data.length > 1) {
                    let comments = response.data;
                    comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setComments(comments)

                } else {
                    setComments(response.data)

                }

            } catch (error) {
                console.error(error);

            }
        }

        getMedComments();

    }, [location.state, medId]);

    useEffect(() => {
        if (userMeds.length === 0) {
            setIsSavedMed(false)
        }
        setIsSavedMed(userMeds.some(userMed =>
            userMed.user_id === profile.id && userMed.medication_id === Number(medId)))

    }, [medId, profile, userMeds])

    let med = medData.find(drug => drug.id === Number(medId));
    if (!med && location.state && location.state.filteredMeds) {
        med = location.state.filteredMeds[0]
    }

    //save drug functions

    const addUserMed = async (medId) => {
        const savedMed = {
            medication_id: medId
        }
        try {
            await axios.post(`${baseUrl}users/${profileId}/meds`, savedMed)

        } catch (error) {
            console.error(error);

        }

    };

    const saveHandler = async () => {
        const newIsSavedMed = !isSavedMed;
        setIsSavedMed(newIsSavedMed);

        try {
            if (newIsSavedMed) {
                await addUserMed(med.id);
            } else {
                await deleteUserMed(med.id, profileId);
            }
            updateUserDrugs();
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div className='details'>
            {isLoadingData
                ? (
                    <img src={pill}
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                        alt='pill' />
                ) : (

                    <>
                        <div className='details__all'>

                            <div className='details__med'>

                                <div className='details__med-name'>
                                    <img src={pill} alt='pill' />
                                    <h3>{med.name}</h3>
                                    <div className='saved-icons' onClick={saveHandler}>
                                        {isSavedMed
                                            ? (
                                                <div className="tooltip" data-tooltip="Unsave from Pill Box">
                                                    <div className="saved-icon">&#9733;</div>
                                                </div>
                                            ) : (
                                                <div className="tooltip" data-tooltip="   Save to Pill Box">
                                                    <div className="saved-icon--not">&#9734;</div>
                                                </div>
                                            )
                                        }

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
                                    (<><div className='details__med-warning'>
                                        <img src={warniing} alt='warning' />
                                        <div className='details__med-warning-styler'>
                                            <div> {med.name} may not be suitable for you due to your pre-existing condition, {profile.preexisting_conditions.toLowerCase()}. </div>
                                            <div>Please consult your doctor before considering this medication. </div>
                                        </div>

                                    </div>
                                        <div className='details__med-divider'> </div>
                                    </>)
                                    : (<div> </div>)}


                                <CommentForm medId={medId} profileId={profileId} updateUserCommentList={updateUserCommentList}/>


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
                                <p className='details__drug-list-title' > Select a drug below for details </p>
                                <div className='details__drug-list'>
                                    {medData.map(med =>
                                    (<Link key={med.id}
                                        className='details__drug-link'
                                        to={`/search/${med.id}`}
                                        state={{ medData, profileId }}>
                                        <div className='details__drug-card' key={med.id}>
                                            <img src={pill} alt='pill' />



                                            <div className='details__drug-details'>
                                                <div className='details__drug-name'>
                                                    {med.name}

                                                </div>
                                                <div className='details__drug-other-details'>
                                                    <h6 className="details__drug-subtitle">
                                                        ACTIVE INGREDIENT </h6>
                                                    <h6 className="details__drug-detail "> {med.active_ingredient}</h6>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>)
                                    )}
                                </div>


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




export default Details