import "./AboutPage.scss";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../consts";
import { useNavigate } from "react-router-dom";
import hero from "../../assets/icons/hero-nb.png";
import pill from '../../assets/icons/pill.png'


function AboutPage({ userMeds, deleteUserMed }) {
    // const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [failedAuth, setFailedAuth] = useState(false);
    const navigate = useNavigate();



    // const savedSection = useRef(null);

    // const scrollTo = () => {
    //     window.scrollTo({ top: savedSection.current.offsetTop, behavior: 'smooth', });
    // }


    const getProfile = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await axios.get(`${baseUrl}users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // setProfile(response.data);
            sessionStorage.setItem('profileId', JSON.stringify(response.data.id));


        } catch (error) {
            console.error(error);
            setFailedAuth(true);
        }

        setIsLoading(false);
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
            <main className="about">
                {/* <h1 className="about__title"> Health Decision-Making Hub </h1> */}
                <img src={pill}
                    style={{ width: '100px', height: '100px', margin: '0 auto' }}
                    alt='pill' />
                <p>Loading...</p>
            </main>
        )
    }

    return (
        <main className="about">
            <div className="about__card">


                <div className="about__message">
                    <section className="about__hero" >
                        <div className="about__hero-styler">
                            <div className="about__hero-top">
                                <div className="about__hero-texts" >
                                    <h1> RxCheck: your Health Decision-Making Hub</h1>

                                    <p> Discover the power to make confident choices about your medications, with insights into active ingredients, contra-indications, indications, and food interactions—all at your fingertips.</p>
                                </div>
                                <img src={hero} className="about__hero-img" alt="hero" />
                            </div>
                            <div className="about__hero-actions">

                                <Link className="about__hero-link" to='/search'>
                                    <button className="about__hero-search" > Search Meds</button>
                                </Link>
                                <Link className="about__hero-link" to='/#saved-meds'>
                                    <button className="about__hero-saved"
                                    // onClick={scrollTo} 
                                    > Your Pill Box</button>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section id="features" className="about__features">
                        <h2>Key Features</h2>
                        <ul>
                            <li className="card">
                                <div className="about__features-card">
                                    <strong>Empowering Information</strong>
                                    <div>
                                        <p>
                                            Unlock detailed insights into your medications, including active ingredients, indications, and contra-indications.
                                            <br />
                                            Understand their effects on your body to make informed, tailored choices.
                                        </p> </div>
                                </div>
                            </li>
                            <li className="card">
                                <div className="about__features-card">
                                    <strong>Safety First</strong>
                                    <div>
                                        <p>
                                            Say goodbye to guesswork. RxCheck highlights potential contra-indications and food interactions, ensuring your safety and well-being. With clear guidance on potential risks, you can navigate your medication regimen with confidence.
                                        </p> </div>
                                </div>
                            </li>
                            <li className="card">
                                <div className="about__features-card">
                                    <strong>Personalized Suggestions</strong>
                                    <div>
                                        <p>
                                            Receive personalized recommendations based on your unique health profile. Whether it's avoiding harmful combinations or optimizing your medication schedule, RxCheck provides customized advice to suit your needs.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="card" >
                                <div className="about__features-card">
                                    <strong>Smooth Decision-Making</strong>
                                    <div>
                                        <p>
                                            Simplify complex decisions with our intuitive interface. Easily compare medications, evaluate their benefits and risks, and make choices that align with your health goals—all from one convenient platform.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>


                    </section>

                </div>



            </div>


        </main >
    );
}


export default AboutPage;