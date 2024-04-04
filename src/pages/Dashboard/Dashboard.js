import "./Dashboard.scss";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../consts";
import { useNavigate } from "react-router-dom";
import hero from "../../assets/icons/hero-nb.png";
import SavedMeds from "../../components/SavedMeds/SavedMeds";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();


  // import { useRef } from react;

  const savedSection = useRef(null);

  const scrollTo = () => {
    window.scrollTo({ top: savedSection.current.offsetTop, behavior: 'smooth', });
  }
  {/* <button className="link" onClick={scrollTo}> About Us </button>

<div className="about" ref={aboutSection}> <h2>About Us</h2> </div>  */}

  const getProfile = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(`${baseUrl}users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfile(response.data);
      sessionStorage.setItem('profileId', JSON.stringify(response.data.id));


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

  useEffect(() => {
    getProfile();
  }, []);

  if (failedAuth) {
    return (
      navigate("/login")
    )
  }

  if (isLoading) {
    return (
      <main className="dashboard">
        <h1 className="dashboard__title">Home</h1>
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="dashboard">
      {/* <h1 className="dashboard__title">Home</h1> */}
      <div className="dashboard__card">


        {/* <div className='dashboard__image' > </div> */}
        <div className="dashboard__message">
          <section className="dashboard__hero" >
            <div className="dashboard__hero-styler">
              <div className="dashboard__hero-texts" >
                <h1> {`${profile.full_name.split(" ")[0]}'s`} Health Decision-Making Hub</h1>
                {/* <h2>Overview:</h2> */}
                {/* <p>RxCheck is your gateway to informed decision-making.</p>  */}
                <p> Discover the power to make confident choices about your medications, with insights into active ingredients, contra-indications, indications, and food interactions—all at your fingertips.</p>
              </div>
              <img src={hero} className="dashboard__hero-img" alt="hero" />
            </div>
            <div className="dashboard__hero-actions">

              <Link className="dashboard__hero-link" to='/search'>
                <button className="dashboard__hero-search" > Search Meds</button>
              </Link>
              {/* <Link className="dashboard__hero-link" to='#saved' > */}
                <button className="dashboard__hero-saved" onClick={scrollTo} > Your Pill Box</button>
              {/* </Link> */}
            </div>
          </section>
          <section id="features" className="dashboard__features">
            <h2>Key Features</h2>
            <ul>
              <li>
                <div className="dashboard__features-card">
                  <strong>Empowering Information</strong>
                  <div>
                    <p>
                      Unlock detailed insights into your medications, including active ingredients, indications, and contra-indications.
                      <br />
                      Understand their effects on your body to make informed, tailored choices.
                    </p> </div>
                </div>
              </li>
              <li>
                <div className="dashboard__features-card">
                  <strong>Safety First</strong>
                  <div>
                    <p>
                      Say goodbye to guesswork. RxCheck highlights potential contra-indications and food interactions, ensuring your safety and well-being. With clear guidance on potential risks, you can navigate your medication regimen with confidence.
                    </p> </div>
                </div>
              </li>
              <li>
                <div className="dashboard__features-card">
                  <strong>Personalized Suggestions</strong>
                  <div>
                    <p>
                      Receive personalized recommendations based on your unique health profile. Whether it's avoiding harmful combinations or optimizing your medication schedule, RxCheck provides customized advice to suit your needs.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="dashboard__features-card">
                  <strong>Smooth Decision-Making</strong>
                  <div>
                    <p>
                      Simplify complex decisions with our intuitive interface. Easily compare medications, evaluate their benefits and risks, and make choices that align with your health goals—all from one convenient platform.
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            {/* <h2>Experience the Difference</h2>
            <p>Take control of your health journey like never before. With RxCheck, you're not just managing medications; you're empowering yourself to make informed decisions that enhance your well-being. Join us and discover the transformative power of knowledge-driven health care.</p>
          */}
          </section>

        </div>


        <section id="saved" ref={savedSection} className="dashboard__saved">
          <h2
          // className="dashboard--sizing"
          > Your Pill Box </h2>
          <p>{`Here are the items in your pill box ${profile.full_name.split(" ")[0]}!`}</p>
          <SavedMeds id={profile.id} />
          <div className="dashboard__profile">
            {/* <p> {profile.full_name}</p> */}
            {/* <h2> Your information</h2>
            <p>{profile.email}</p>
            <p>{profile.age} years old</p>
            <p>{profile.gender}</p>
            <p>Pre-existing Condition: {profile.preexisting_conditions}</p> */}


          </div>

          {/* <button onClick={logout}>
          Log out
        </button> */}
        </section>
      </div>


    </main >
  );
}


export default Dashboard;