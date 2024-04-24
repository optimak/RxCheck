import "./Dashboard.scss";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../consts";
import { useNavigate } from "react-router-dom";
import SavedMeds from "../../components/SavedMeds/SavedMeds";
import pill from '../../assets/icons/pill.png'
import reviewIcon from '../../assets/icons/reviews.svg'


function Dashboard({ userMeds, deleteUserMed, userComments, allMeds , getProfileId}) {
  const [profile, setProfile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();



  const savedSection = useRef(null);



  const daysSince = (dateString) => {

    // Create a Date object for the current time
    const difference = new Date() - new Date(dateString);


    const diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24));

    return diffInDays;
  };
  function formatDateToUS(dateStr) {
    const dateObj = new Date(dateStr);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }



  console.log(userComments)

  useEffect(() => {
    const getProfile = async () => {
      const token = sessionStorage.getItem("token");
  
      try {
        const response = await axios.get(`${baseUrl}users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setProfile(response.data);
        sessionStorage.setItem('profileId', JSON.stringify(response.data.id));
        sessionStorage.setItem('allMeds', JSON.stringify(allMeds));
        getProfileId(response.data.id)
  
      } catch (error) {
        console.error(error);
        setFailedAuth(true);
      }
  
      setIsLoading(false);
    };

    getProfile();
  }, [allMeds,getProfileId]);


  if (failedAuth) {
    return (
      navigate("/login")
    )
  }
  // console.log(userMeds)

  if (isLoading || !userComments) {
    return (
      <main className="dashboard">
        {/* <h1 className="dashboard__title"> Health Hub </h1> */}
        <img src={pill}
          style={{ width: '100px', height: '100px', margin: '0 auto' }}
          alt='pill' />
        <p>Loading...</p>
      </main>
    )
  }
  const profileId = JSON.parse(sessionStorage.getItem('profileId'));
  // const filteredMeds = [...userMeds];
  return (
    <main className="dashboard">

      <section className="dashboard__welcome">
        <h2
        > Welcome to your health hub {`${profile.full_name.split(" ")[0]}`} 👋</h2>
        <div className="dashboard__activity" >
          <h4> Your Activity</h4>
          <div className="dashboard__activity-styler">
            <div className="dashboard__activity-card"> <p>Last logged in </p>
              <h4>{formatDateToUS(profile.last_login)}
            </h4>
            </div>
            <div className="dashboard__activity-card"> <p>Last Saved item</p><h4>{userMeds && userMeds.length > 0 ? `${userMeds.slice(-1)[0].name}` : "None"}</h4></div>

            <div onClick={() => setShow(!show)} className="dashboard__activity-card dashboard__activity-card-reviews">
              <div className="reviews">
                <p>Your reviews </p>
              <h4>{userComments.length}</h4>
              </div>
              {show && <p>⬇️</p>}

            </div>
           
            <div className="dashboard__activity-card"> <p>Days Since Last review</p> <h4>{userComments && userComments.length > 0 ? `${daysSince(userComments.slice(-1)[0].updated_at)}` : "None"}</h4> </div>

            {/* <p>{`You have ${userMeds.length} item${userMeds.length === 1 ? "" : "s"} in your pill box ${profile.full_name.split(" ")[0]}!`}</p> */}
            {/* <div className="dashboard__activity-card"> <p>Last Saved item</p><h4>{userMeds && userMeds.length > 0 ? `${userMeds.slice(-1)[0].name}` : "None"}</h4></div> */}

            <div className="dashboard__profile">


            </div>
          </div>
          {show && userComments.length > 0 && (<div className="comment-card"> {userComments.map((comment) => {
              return (<Link className="dashboard__comment-link" key={comment.id} to={`/search/${comment.medication_id}`}
                state={{
                  allMeds,
                  profileId,
                }}>
                <div className="dashboard__comment-card" ><img src={reviewIcon} alt="review" />
                <div> <p>{comment.med_name}</p> <p> <em>{comment.content}</em></p></div>
                </div>
              </Link>)
            })}
            </div>)}
        </div>
      </section>


      <section id="saved" ref={savedSection} className="dashboard__saved">
        <h4
        > Your Pill Box </h4>
        <p>{`You have ${userMeds.length} item${userMeds.length === 1 ? "" : "s"} in your pill box ${profile.full_name.split(" ")[0]}!`}</p>
        <SavedMeds id={profile.id} userMeds={userMeds} deleteUserMed={deleteUserMed} />
        <div className="dashboard__profile">


        </div>

      </section>
      {/* </div> */}


    </main >
  );
}


export default Dashboard;