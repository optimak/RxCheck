import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import DrugList from '../../components/DrugList/DrugList'
import './Details.scss';
import axios from 'axios';
import { baseUrl } from "../../consts";
import pill from '../../assets/icons/pill.png'
import avatar from '../../assets/icons/avatar.png'
import CommentForm from '../../components/CommentForm/CommentForm';




function Details() {
    const { medId } = useParams()
    const location = useLocation();
    // const { filteredMeds } = location.state;
    const [comments, setComments] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [medData, setMedData] = useState([]);
    const [profile, setProfile] = useState(null);



    // if (location.state){
    //     const { filteredMeds } = location.state;
    //     // if (filteredMeds){
    //         setMedData(filteredMeds)
    //     // }
    // }
    const getMedComments = async () => {
        try {
            const response = await axios.get(`${baseUrl}comments/${medId}`);
            setComments(response.data)

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
    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.state && location.state.filteredMeds) {
            setMedData(location.state.filteredMeds);
            setIsLoadingData(false);
            setProfile(location.state.profileId)


        } else {
            getMeds();
        }
        // Ensure getMedComments is called only once when the component mounts or medId changes
        getMedComments();
        // Adding medId as a dependency to re-fetch comments if it changes.
    }, [location.state, medId]);

    // if (medData.length === 0) {
    //     return <div> Loading.. </div>
    // }
    // useEffect(() => {
    //     // getMedComments();
    //     getMeds();

    // }, [])
    // useEffect(() => {
    //     getMedComments();
    //     // getMeds();

    // },[] )

    console.log(medId, comments, medData)
    const med = medData.find(drug => drug.id === Number(medId))
    return (
        <div className='details'>
            {/* {medId} */}
            {/* DETAILS PAGE */}
            <div className='details__drug-list'>

                {/* <DrugList filteredMeds={filteredMeds} /> */}
                {/* <div className='drug-list'> */}
                {medData.map(med =>
                (<Link
                    className='details__drug-link'
                    to={`/search/${med.id}`}
                    state={{ medData }}>
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
            {isLoadingData ? (
                <p>Loading...</p>
            ) : (
                <div className='details__med'>

                    <div className='details__med-name'>
                        <img src={pill} alt='pill' />
                        <h3>{med.name}</h3>
                    </div>
                    <div className='details__med-divider'> </div>
                    <div className='details__med-details'>

                        <p className='details__med-text'> <strong> {med.indications} </strong> </p>
                        <div>
                            <p className='details__med-subtitle'> SIDE EFFECTS INCLUDE</p>
                            <p className='details__med-text'>{med.side_effects} </p>
                        </div>
                        <div>
                            <p className='details__med-subtitle'> AVOID IF YOU HAVE</p>
                            <p className='details__med-text'>{med.contra_indications} </p>
                        </div>

                    </div>
                    <div className='details__med-divider'> </div>



                    <CommentForm medId={medId} profileId={profile} />


                    <div className='details__med-divider'> </div>
                    <div className='details__med-comments'>
                        {comments.map(comment =>

                            <div className='details__med-comment' key={comment.id}>

                                <div className='details__med-comment-image' > </div>

                                <div className='details__med-comment-right-styler'>
                                    <div className='details__med-comment-top'> <h6 className='details__med-subtitle'> {comment.user_name} </h6>
                                        <p>{new Date(comment.updated_at).toLocaleDateString('en-US')}</p>
                                    </div>
                                    <p>  {comment.content} </p>
                                </div>


                            </div>
                        )}

                    </div>

                </div>
            )}



        </div>

        // </div >


    )
}

export default Details